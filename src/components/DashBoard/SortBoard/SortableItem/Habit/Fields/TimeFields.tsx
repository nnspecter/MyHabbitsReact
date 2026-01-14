import { Input } from '@mui/material';
import { use, useEffect, useState } from 'react'
import { useNewRecord } from '@/api/mutations';
import { formatTimeFull, UnFormatTime } from '@/features/TimeFormatter/TimeFormatter';


interface record {
  habitId: number;
  date: string;
  value: string | null;
}
//только мутирует
const TimeFields = ({record}: {record: record}) => {

    const newRecordMutation = useNewRecord();
    const[newRecord, setNewRecord] = useState({
      habitId: record.habitId,
      date: record.date,
      value: record.value
    });

    useEffect(() => {
      setNewRecord(record);
    }, [record]);
    
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    
    useEffect(()=>{
        if(!record.value) return;
        const { hours, minutes, seconds } = UnFormatTime(record.value);
        setTime({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })
    },[record.value])

    useEffect(()=>{
        setNewRecord({
            ...newRecord,
             value: formatTimeFull(time.hours, time.minutes, time.seconds)
        })
    },[time])
    
    const handleValueDisplay = (value: number) => {
        if (value===0) return ""
        return value;
    }
    

    const handleAccept = () => {
        console.log("Accepted value:", newRecord);
        if (record.value !== newRecord.value) {
            newRecordMutation.mutate(newRecord);
            console.log( "Новая запись создана");
        }
    };

  return (
    <div>
        <Input
            type="number"
            placeholder="Hours"
            value={handleValueDisplay(time.hours)}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= 23 && value >= 0) {
                setTime({ ...time, hours: value });
                }
            }}
            onBlur={()=> handleAccept()}
            sx={{ width: '60px', marginRight: '8px' }}

        />
        <Input
            type="number"
            placeholder="Min"
            value={handleValueDisplay(time.minutes)}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= 59 && value >= 0) {
                setTime({ ...time, minutes: value });
                }
            }}
            onBlur={()=> handleAccept()}
            sx={{ width: '60px', marginRight: '8px' }}
        />
        <Input
            type="number"
            placeholder="Sec"
            value={handleValueDisplay(time.seconds)}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= 59 && value >= 0) {
                setTime({ ...time, seconds: value });
                }
            }}
            onBlur={()=> handleAccept()}
            sx={{ width: '60px', marginRight: '8px' }}
        />
    </div>
  )
}

export default TimeFields