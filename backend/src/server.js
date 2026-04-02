import express from 'express';
import cors from 'cors';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, '..', 'data');
const reservationDataFile = path.join(dataDirectory, 'reservations.json');
const signupDataFile = path.join(dataDirectory, 'signups.json');
const adminSessionDataFile = path.join(dataDirectory, 'admin-sessions.json');
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
const adminUsers = [
  {
    email: 'tamakurashvili056@gmail.com',
    name: 'Billiard Hall Admin',
    password: process.env.ADMIN_PASSWORD || 'HallAdmin2026!'
  }
];

app.use(
  cors({
    origin: true,
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

function sanitize(value) {
  return String(value || '').trim();
}

function normalizeChoice(value) {
  return sanitize(value).toLowerCase();
}

function normalizeEmail(email) {
  return normalizeChoice(email);
}

function buildMessage(message) {
  return { message };
}

function isValidChoice(value, allowed) {
  return allowed.includes(value);
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

function validateDuration(durationHours) {
  if (!Number.isInteger(durationHours) || durationHours < 1 || durationHours > 12) {
    return buildMessage('Duration must be between 1 and 12 hours.');
  }

  return null;
}

function normalizePaymentStatus(value) {
  return normalizeChoice(value) === 'paid' ? 'paid' : 'unpaid';
}

function normalizeReservationRecord(record) {
  const reservationType = normalizeChoice(record.reservationType || 'billiard');
  const durationHours = Number.isInteger(Number(record.durationHours))
    ? Number(record.durationHours)
    : Number.isInteger(Number(record.durationMinutes))
      ? Math.max(1, Math.round(Number(record.durationMinutes) / 60))
      : 1;
  const tableNumber = reservationType === 'billiard' ? Number(record.tableNumber) || 1 : 0;
  const paymentStatus = record.paymentStatus === 'paid' || record.isPaid === true ? 'paid' : 'unpaid';
  const totalPrice = Number(record.totalPrice) || ((hourlyRates[reservationType] || 0) * durationHours);

  return {
    id: record.id || randomUUID(),
    fullName: sanitize(record.fullName),
    email: sanitize(record.email),
    phone: sanitize(record.phone),
    reservationType: isValidChoice(reservationType, ['billiard', 'playstation']) ? reservationType : 'billiard',
    reservationDate: reservationDateKey(record.reservationDate),
    reservationTime: sanitize(record.reservationTime),
    durationHours,
    tableNumber,
    notes: sanitize(record.notes),
    totalPrice,
    paymentStatus,
    paidAt: paymentStatus === 'paid' ? sanitize(record.paidAt) || sanitize(record.updatedAt) || null : null,
    createdAt: sanitize(record.createdAt) || new Date().toISOString()
  };
}

async function getReservations() {
  const records = await readCollection(reservationDataFile);
  return records.map(normalizeReservationRecord);
}

async function saveReservations(reservations) {
  await writeCollection(reservationDataFile, reservations.map(normalizeReservationRecord));
}

async function getSignups() {
  return readCollection(signupDataFile);
}

async function saveSignups(signups) {
  await writeCollection(signupDataFile, signups);
}

async function getAdminSessions() {
  return readCollection(adminSessionDataFile);
}

async function saveAdminSessions(sessions) {
  await writeCollection(adminSessionDataFile, sessions);
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function findAdminByEmail(email) {
  return adminUsers.find((item) => item.email === normalizeEmail(email));
}

function createAdminToken() {
  return `${randomUUID()}-${randomBytes(16).toString('hex')}`;
}

function getAdminTokenFromRequest(request) {
  const header = sanitize(request.headers.authorization);

  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim();
  }

  return sanitize(request.headers['x-admin-token']);
}

async function requireAdmin(request, response) {
  const token = getAdminTokenFromRequest(request);

  if (!token) {
    response.status(401).json({
      message: 'Admin authorization is required.'
    });
    return null;
  }

  const sessions = await getAdminSessions();
  const session = sessions.find((item) => item.token === token);

  if (!session) {
    response.status(401).json({
      message: 'Admin session is not valid.'
    });
    return null;
  }

  const admin = findAdminByEmail(session.email);

  if (!admin) {
    response.status(401).json({
      message: 'Admin account was not found.'
    });
    return null;
  }

  return {
    admin,
    session,
    sessions
  };
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
      return (
        reservationDateKey(item.reservationDate) === reservationDate &&
        item.reservationType === reservationType &&
        item.tableNumber === tableNumber &&
        reservationsOverlap(item.reservationTime, item.durationHours, candidateTime, durationHours)
      );
    });
  });
}

function sortReservations(reservations) {
  return [...reservations].sort((left, right) => {
    const leftStamp = `${left.reservationDate}T${left.reservationTime}`;
    const rightStamp = `${right.reservationDate}T${right.reservationTime}`;
    return rightStamp.localeCompare(leftStamp);
  });
}

async function bootstrapStore() {
  await ensureDataFile(reservationDataFile);
  await ensureDataFile(signupDataFile);
  await ensureDataFile(adminSessionDataFile);
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.post('/api/admin/login', async (request, response) => {
  const email = normalizeEmail(request.body.email);
  const password = sanitize(request.body.password);
  const admin = findAdminByEmail(email);

  if (!admin || !safeCompare(password, admin.password)) {
    response.status(401).json({
      message: 'Admin login details are not valid.'
    });
    return;
  }

  const sessions = await getAdminSessions();
  const token = createAdminToken();
  const nextSessions = sessions.filter((item) => item.email !== admin.email);

  nextSessions.push({
    id: randomUUID(),
    email: admin.email,
    token,
    createdAt: new Date().toISOString()
  });

  await saveAdminSessions(nextSessions);

  response.json({
    token,
    admin: {
      email: admin.email,
      name: admin.name
    }
  });
});

app.post('/api/admin/logout', async (request, response) => {
  const token = getAdminTokenFromRequest(request);

  if (!token) {
    response.status(204).end();
    return;
  }

  const sessions = await getAdminSessions();
  const nextSessions = sessions.filter((item) => item.token !== token);
  await saveAdminSessions(nextSessions);
  response.status(204).end();
});

app.get('/api/admin/reservations', async (request, response) => {
  const adminContext = await requireAdmin(request, response);

  if (!adminContext) {
    return;
  }

  const reservations = sortReservations(await getReservations());

  response.json({
    admin: {
      email: adminContext.admin.email,
      name: adminContext.admin.name
    },
    reservations
  });
});

app.patch('/api/admin/reservations/:reservationId/payment', async (request, response) => {
  const adminContext = await requireAdmin(request, response);

  if (!adminContext) {
    return;
  }

  const reservationId = sanitize(request.params.reservationId);
  const paymentStatus = normalizePaymentStatus(request.body.paymentStatus);
  const reservations = await getReservations();
  const reservation = reservations.find((item) => item.id === reservationId);

  if (!reservation) {
    response.status(404).json({
      message: 'Reservation was not found.'
    });
    return;
  }

  reservation.paymentStatus = paymentStatus;
  reservation.paidAt = paymentStatus === 'paid' ? new Date().toISOString() : null;

  await saveReservations(reservations);

  response.json({
    message: 'Reservation payment status updated.',
    reservation
  });
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
    return (
      reservationDateKey(item.reservationDate) === validated.reservationDate &&
      item.reservationType === validated.reservationType &&
      item.tableNumber === validated.tableNumber &&
      reservationsOverlap(item.reservationTime, item.durationHours, validated.reservationTime, validated.durationHours)
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
  const record = normalizeReservationRecord({
    id: randomUUID(),
    ...validated,
    totalPrice,
    paymentStatus: 'unpaid',
    paidAt: null,
    createdAt: new Date().toISOString()
  });

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
