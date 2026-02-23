import { Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { useNewRecord } from '@/shared/api/mutations/mutations';
import { formatTimeFull, UnFormatTime } from '@/features/TimeFormatter/TimeFormatter';


interface record {
  habitId: number;
  date: string;
  value: string | null;
}

const TimeFields = ({record}: {record: record}) => {
    const newRecordMutation = useNewRecord();
    const { hours, minutes, seconds } = UnFormatTime(record.value);
    const [time, setTime] = useState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });
    const isFirstRender = useRef(true);
        
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        };
        const formattedTime = formatTimeFull(time.hours, time.minutes, time.seconds);
        if (record.value === formattedTime) return;
        const timer = setTimeout(() => {
            newRecordMutation.mutate({
                ...record,
                value: formattedTime
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);


    const handleTimeChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value = e.target.value === "" ? 0 : Number(e.target.value)
        if (isNaN(value)) return;

        if (!target.id) return;
        switch (target.id) {
            case "hours":
                if (value <= 23 && value >= 0) {
                    setTime(prev => ({ ...prev, hours: value }));
                }
                break;
            case "minutes":
                if (value <= 59 && value >= 0) {
                    setTime(prev => ({ ...prev, minutes: value }));
                }
                break;
            case "seconds":
                if (value <= 59 && value >= 0) {
                    setTime(prev => ({ ...prev, seconds: value }));
                }
                break;
            default:
                return;         
        }
    }
    
    
    const handleValueDisplay = (value: number) => {
        if (value===0) return "";
        return value;
    }
    

  return (
    <form >
        <Input
            id="hours"
            type="number"
            placeholder="Hours"
            value={handleValueDisplay(time.hours)}
            onChange={handleTimeChange}
            sx={{ width: '60px', marginRight: '8px' }}

        />
        <Input
            id="minutes"
            type="number"
            placeholder="Min"
            value={handleValueDisplay(time.minutes)}
            onChange={handleTimeChange}
            sx={{ width: '60px', marginRight: '8px' }}
        />
        <Input
            id="seconds"
            type="number"
            placeholder="Sec"
            value={handleValueDisplay(time.seconds)}
            onChange={handleTimeChange}
            sx={{ width: '60px', marginRight: '8px' }}
        />
    </form>
  )
}

export default TimeFields