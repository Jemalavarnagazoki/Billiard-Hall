import { useEffect, useState } from 'react';
import { fetchReservationSummary } from '../lib/api';

const initialState = {
  totalTables: 13,
  todayReservations: 0,
  remainingTables: 13
};

export default function useVenueSummary() {
  const [summary, setSummary] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchReservationSummary()
      .then((data) => {
        if (isMounted) {
          setSummary(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { summary, error, setSummary };
}
