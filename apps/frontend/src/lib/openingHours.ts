export function isOpenNow(openingHours?: string): boolean {
  if (!openingHours) return false;
  const match = openingHours.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/);
  if (!match) return false;
  const [, openH, openM, closeH, closeM] = match.map(Number);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const open = openH * 60 + openM;
  const close = closeH * 60 + closeM;
  if (close > open) return current >= open && current < close;
  return current >= open || current < close;
}
