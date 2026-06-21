import { useState, useEffect, useCallback } from 'react';

export type LocationPermissionStatus = 'idle' | 'requesting' | 'granted' | 'denied';

export function useLocationPermission() {
  const [status, setStatus] = useState<LocationPermissionStatus>('idle');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // If permission was already granted in a previous session, silently get coords
  useEffect(() => {
    let mounted = true;
    if (typeof navigator === 'undefined' || !navigator.permissions) return;
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (!mounted) return;
      if (result.state === 'granted') {
        setStatus('requesting');
        navigator.geolocation.getCurrentPosition(
          pos => {
            if (!mounted) return;
            setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setStatus('granted');
          },
          () => { if (mounted) setStatus('denied'); },
        );
      } else if (result.state === 'denied') {
        setStatus('denied');
      }
    }).catch(() => { /* permissions API unavailable */ });
    return () => { mounted = false; };
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator?.geolocation || status === 'requesting' || status === 'granted') return;
    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('granted');
      },
      () => setStatus('denied'),
    );
  }, [status]);

  return { status, coords, requestLocation };
}
