export function isLight(hex: string): boolean {
  // убираем #
  const c = hex.replace('#', '');

  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);

  // формула яркости (WCAG)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 155; // порог можно подстроить
}
