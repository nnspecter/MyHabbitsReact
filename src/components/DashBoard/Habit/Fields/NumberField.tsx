import { Input } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNewRecord } from '../../../../api/mutations';

interface record {
  habitId: number;
  date: string;
  value: number | null;
}
//только мутирует
const NumberField = ({record}: {record: record}) => {

    const newRecordMutation = useNewRecord();
    const[newRecord, setNewRecord] = useState({
      habitId: record.habitId,
      date: record.date,
      value: record.value
    });

    useEffect(() => {
          setNewRecord(record);
        }, [record]);

    const handleAccept = () => {
        console.log("Accepted value:", newRecord);
        if (record.value !== newRecord.value) {
            newRecordMutation.mutate(newRecord);
            console.log( "Новая запись создана");
        }
    };

  return (
    <Input
        type='number'
        placeholder="Значение"
        fullWidth
        value={newRecord.value ?? ""}
        onChange={(e) => setNewRecord({...newRecord, value: Number(e.target.value)})}
        onBlur={() => handleAccept()}
    />
  )
}

export default NumberField