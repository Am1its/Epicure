import { useState, useEffect } from 'react';

const TEL_AVIV_CENTER = { lat: 32.0782, lng: 34.7748 };

export function useUserLocation(): { coords: { lat: number; lng: number } | null; loading: boolean } {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setCoords(TEL_AVIV_CENTER);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(TEL_AVIV_CENTER),
    );
  }, []);

  return { coords, loading: coords === null };
}
