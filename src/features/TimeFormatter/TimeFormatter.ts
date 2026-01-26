interface formatTimeFull{
  hours: number;
  minutes: number;
  seconds: number;
}


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


export function formatTimeShortFromSeconds(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return "0с";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (hours) parts.push(`${hours}ч`);
  if (minutes) parts.push(`${minutes}м`);
  if (seconds) parts.push(`${seconds}с`);

  return parts.join(" ");
}


export function formatTimeFull(hours: number ,minutes: number ,seconds: number): string  {
    const hStr = hours < 10 ? `0${hours}` : `${hours}`;
    const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const sStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${hStr}:${mStr}:${sStr}`;
}


export function UnFormatTime(time:string) : {hours: number; minutes: number; seconds: number} {
    const [hStr, mStr, sStr] = time.split(":");
    const hours = parseInt(hStr, 10);
    const minutes = parseInt(mStr, 10);
    const seconds = parseInt(sStr, 10);

    return { hours, minutes, seconds };
}