const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

function buildApiUrl(path) {
  return `${apiBaseUrl}${path}`;
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
