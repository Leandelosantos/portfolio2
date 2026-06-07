// useLocalTime.js — Footer — Hora local de Leandro (Buenos Aires, UTC-3)

import { useState, useEffect } from 'react';

/**
 * Retorna la hora actual en la timezone de Buenos Aires, actualizada cada minuto.
 * Formato: "14:35 ART"
 */
export function useLocalTime() {
  const getTime = () => {
    return new Intl.DateTimeFormat('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date()) + ' ART';
  };

  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
