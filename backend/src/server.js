import express from 'express';
import cors from 'cors';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, '..', 'data');
const reservationDataFile = path.join(dataDirectory, 'reservations.json');
const signupDataFile = path.join(dataDirectory, 'signups.json');
const app = express();
const port = process.env.PORT || 4000;
const totalTables = 13;
const openingStartMinutes = 14 * 60;
const closingEndMinutes = (24 + 2) * 60;
const allowedReservationTimes = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'];
const hourlyRates = {
  billiard: 15,
  playstation: 10
};

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: false
  })
);
app.use(express.json());

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });
}

async function ensureDataFile(dataFile) {
  await ensureStore();

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    await writeFile(dataFile, '[]');
  }
}

async function readCollection(dataFile) {
  await ensureDataFile(dataFile);
  const raw = await readFile(dataFile, 'utf8');
  return JSON.parse(raw);
}

async function writeCollection(dataFile, records) {
  await ensureDataFile(dataFile);
  await writeFile(dataFile, JSON.stringify(records, null, 2));
}

async function getReservations() {
  return readCollection(reservationDataFile);
}

async function saveReservations(reservations) {
  await writeCollection(reservationDataFile, reservations);
}

async function getSignups() {
  return readCollection(signupDataFile);
}

async function saveSignups(signups) {
  await writeCollection(signupDataFile, signups);
}

function sanitize(value) {
  return String(value || '').trim();
}

function buildMessage(message) {
  return { message };
}

function isValidChoice(value, allowed) {
  return allowed.includes(value);
}

function normalizeChoice(value) {
  return sanitize(value).toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9+\s()-]{8,20}$/.test(phone);
}

function reservationDateKey(value) {
  return sanitize(value).split('T')[0];
}

function isValidReservationTime(time) {
  return allowedReservationTimes.includes(time);
}

function timeToBusinessMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  let total = (hours * 60) + minutes;

  if (total < openingStartMinutes) {
    total += 24 * 60;
  }

  return total;
}

function getReservationWindow(time, durationHours) {
  const start = timeToBusinessMinutes(time);
  return {
    start,
    end: start + (durationHours * 60)
  };
}

function reservationsOverlap(firstTime, firstDurationHours, secondTime, secondDurationHours) {
  const first = getReservationWindow(firstTime, firstDurationHours);
  const second = getReservationWindow(secondTime, secondDurationHours);
  return first.start < second.end && second.start < first.end;
}

function normalizeDurationHours(value) {
  return Number.parseInt(String(value), 10);
}

function validateSignup(payload) {
  const fullName = sanitize(payload.fullName);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const plan = normalizeChoice(payload.plan);

  if (!fullName || fullName.length < 2) {
    return buildMessage('Please enter a valid full name.');
  }

  if (!isValidEmail(email)) {
    return buildMessage('Please enter a valid email address.');
  }

  if (!isValidPhone(phone)) {
    return buildMessage('Please enter a valid phone number.');
  }

  if (!isValidChoice(plan, ['billiard', 'playstation', 'events'])) {
    return buildMessage('Selected service is not valid.');
  }

  return {
    fullName,
    email,
    phone,
    plan
  };
}

function validateDuration(durationHours) {
  if (!Number.isInteger(durationHours) || durationHours < 1 || durationHours > 12) {
    return buildMessage('Duration must be between 1 and 12 hours.');
  }

  return null;
}

function validateReservation(payload) {
  const fullName = sanitize(payload.fullName);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const reservationDate = sanitize(payload.reservationDate);
  const reservationTime = sanitize(payload.reservationTime);
  const notes = sanitize(payload.notes);
  const reservationType = normalizeChoice(payload.reservationType || 'billiard');
  const durationHours = normalizeDurationHours(payload.durationHours || 1);
  const tableNumber = reservationType === 'billiard' ? Number(payload.tableNumber) : 0;

  if (!fullName || fullName.length < 2) {
    return buildMessage('Please enter a valid full name.');
  }

  if (!isValidEmail(email)) {
    return buildMessage('Please enter a valid email address.');
  }

  if (!isValidPhone(phone)) {
    return buildMessage('Please enter a valid phone number.');
  }

  if (!reservationDate) {
    return buildMessage('Please choose a reservation date.');
  }

  if (!reservationTime) {
    return buildMessage('Please choose a reservation time.');
  }

  if (!isValidReservationTime(reservationTime)) {
    return buildMessage('Selected reservation time is not valid.');
  }

  const durationError = validateDuration(durationHours);
  if (durationError) {
    return durationError;
  }

  if (!isValidChoice(reservationType, ['billiard', 'playstation'])) {
    return buildMessage('Selected reservation type is not valid.');
  }

  if (reservationType === 'billiard' && (!Number.isInteger(tableNumber) || tableNumber < 1 || tableNumber > totalTables)) {
    return buildMessage('Selected table is not valid.');
  }

  const window = getReservationWindow(reservationTime, durationHours);
  if (window.end > closingEndMinutes) {
    return buildMessage('Selected duration goes past closing time.');
  }

  return {
    fullName,
    email,
    phone,
    reservationType,
    reservationDate,
    reservationTime,
    durationHours,
    tableNumber,
    notes
  };
}

function buildUnavailableTimes(reservations, reservationDate, reservationType, tableNumber, durationHours) {
  return allowedReservationTimes.filter((candidateTime) => {
    const candidateWindow = getReservationWindow(candidateTime, durationHours);

    if (candidateWindow.end > closingEndMinutes) {
      return true;
    }

    return reservations.some((item) => {
      const itemType = item.reservationType || 'billiard';
      const itemDurationHours = Number(item.durationHours || 1);

      return (
        reservationDateKey(item.reservationDate) === reservationDate &&
        itemType === reservationType &&
        item.tableNumber === tableNumber &&
        reservationsOverlap(item.reservationTime, itemDurationHours, candidateTime, durationHours)
      );
    });
  });
}

async function bootstrapStore() {
  await ensureDataFile(reservationDataFile);
  await ensureDataFile(signupDataFile);
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/reservations/summary', async (_request, response) => {
  const reservations = await getReservations();
  const today = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter((item) => reservationDateKey(item.reservationDate) === today).length;

  response.json({
    totalTables,
    todayReservations,
    remainingTables: Math.max(totalTables - todayReservations, 0)
  });
});

app.get('/api/reservations/availability', async (request, response) => {
  const reservationDate = reservationDateKey(request.query.date);
  const reservationType = normalizeChoice(request.query.type || 'billiard');
  const durationHours = normalizeDurationHours(request.query.durationHours || 1);
  const tableNumber = reservationType === 'billiard' ? Number(request.query.table) : 0;

  if (!reservationDate) {
    response.status(400).json({
      message: 'Reservation date is required.'
    });
    return;
  }

  if (!isValidChoice(reservationType, ['billiard', 'playstation'])) {
    response.status(400).json({
      message: 'Selected reservation type is not valid.'
    });
    return;
  }

  const durationError = validateDuration(durationHours);
  if (durationError) {
    response.status(400).json(durationError);
    return;
  }

  if (reservationType === 'billiard' && (!Number.isInteger(tableNumber) || tableNumber < 1 || tableNumber > totalTables)) {
    response.status(400).json({
      message: 'Selected table is not valid.'
    });
    return;
  }

  const reservations = await getReservations();
  const unavailableTimes = buildUnavailableTimes(reservations, reservationDate, reservationType, tableNumber, durationHours);

  response.json({
    reservationDate,
    reservationType,
    tableNumber,
    durationHours,
    unavailableTimes
  });
});

app.post('/api/reservations', async (request, response) => {
  const validated = validateReservation(request.body);

  if (validated.message) {
    response.status(400).json(validated);
    return;
  }

  const reservations = await getReservations();
  const hasOverlap = reservations.some((item) => {
    const itemType = item.reservationType || 'billiard';
    const itemDurationHours = Number(item.durationHours || 1);

    return (
      reservationDateKey(item.reservationDate) === validated.reservationDate &&
      itemType === validated.reservationType &&
      item.tableNumber === validated.tableNumber &&
      reservationsOverlap(item.reservationTime, itemDurationHours, validated.reservationTime, validated.durationHours)
    );
  });

  if (hasOverlap) {
    response.status(409).json({
      message:
        validated.reservationType === 'playstation'
          ? 'PlayStation is already booked for that time slot.'
          : `Table ${validated.tableNumber} is already booked for that time slot.`
    });
    return;
  }

  const totalPrice = hourlyRates[validated.reservationType] * validated.durationHours;
  const record = {
    id: randomUUID(),
    ...validated,
    totalPrice,
    createdAt: new Date().toISOString()
  };

  reservations.push(record);
  await saveReservations(reservations);

  response.status(201).json({
    message: 'Reservation saved.',
    reservation: record
  });
});

app.post('/api/signups', async (request, response) => {
  const validated = validateSignup(request.body);

  if (validated.message) {
    response.status(400).json(validated);
    return;
  }

  const signups = await getSignups();
  const record = {
    id: randomUUID(),
    ...validated,
    createdAt: new Date().toISOString()
  };

  signups.push(record);
  await saveSignups(signups);

  response.status(201).json({
    message: 'Signup saved.',
    signup: record
  });
});

bootstrapStore().then(() => {
  app.listen(port, () => {
    console.log(`Billiard Hall backend running on http://localhost:${port}`);
  });
});
