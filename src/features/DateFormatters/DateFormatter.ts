import { DateTime } from 'luxon';

export const dateFormatter = (date: string, days: number): string => {
    const dt = DateTime.fromISO(date);
    const newDt = dt.plus({ days });

    console.log(newDt.toISODate()) 
    return newDt.toISODate();
}