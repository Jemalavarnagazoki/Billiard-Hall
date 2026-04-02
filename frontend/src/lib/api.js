const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
export const ADMIN_TOKEN_STORAGE_KEY = 'billiardHallAdminToken';
export const ADMIN_EMAIL_STORAGE_KEY = 'billiardHallAdminEmail';

function buildApiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

function buildAdminHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}

async function parseResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

export async function fetchReservationSummary() {
  const response = await fetch(buildApiUrl('/api/reservations/summary'));
  return parseResponse(response, 'ჯავშნების ინფორმაციის ჩატვირთვა ვერ მოხერხდა.');
}

export async function fetchReservationAvailability({ date, tableNumber, type, durationHours }) {
  const params = new URLSearchParams({
    date,
    table: String(tableNumber),
    type: String(type),
    durationHours: String(durationHours)
  });
  const response = await fetch(buildApiUrl(`/api/reservations/availability?${params.toString()}`));
  return parseResponse(response, 'თავისუფალი დროების ჩატვირთვა ვერ მოხერხდა.');
}

export async function createReservation(payload) {
  const response = await fetch(buildApiUrl('/api/reservations'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, 'ჯავშნის გაგზავნა ვერ მოხერხდა.');
}

export async function createSignup(payload) {
  const response = await fetch(buildApiUrl('/api/signups'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, 'რეგისტრაციის გაგზავნა ვერ მოხერხდა.');
}

export async function createAdminSession(payload) {
  const response = await fetch(buildApiUrl('/api/admin/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return parseResponse(response, 'ადმინის ავტორიზაცია ვერ მოხერხდა.');
}

export async function destroyAdminSession(token) {
  await fetch(buildApiUrl('/api/admin/logout'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function fetchAdminReservations(token) {
  const response = await fetch(buildApiUrl('/api/admin/reservations'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return parseResponse(response, 'ჯავშნების ჩატვირთვა ვერ მოხერხდა.');
}

export async function updateReservationPaymentStatus({ reservationId, paymentStatus, token }) {
  const response = await fetch(buildApiUrl(`/api/admin/reservations/${reservationId}/payment`), {
    method: 'PATCH',
    headers: buildAdminHeaders(token),
    body: JSON.stringify({ paymentStatus })
  });

  return parseResponse(response, 'გადახდის სტატუსის განახლება ვერ მოხერხდა.');
}
