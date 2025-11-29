export function formatTimeShort(timeStr: string): string {
  const [hStr, mStr, sStr] = timeStr.split(":");
  const hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr, 10);
  const seconds = parseInt(sStr, 10);

  const parts: string[] = [];
  if (hours) parts.push(`${hours}ч`);
  if (minutes) parts.push(`${minutes}м`);
  if (seconds) parts.push(`${seconds}с`);

  if (parts.length === 0) parts.push("0с");

  return parts.join(" ");
}


