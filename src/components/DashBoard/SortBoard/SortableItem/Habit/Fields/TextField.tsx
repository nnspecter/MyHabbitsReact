import { Input, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNewRecord } from '../../../../../../api/mutations';
import InputLenght from '../../../../../../features/Input/InputLenght';

interface record {
  habitId: number;
  date: string;
  value: string | null;
}
//только мутирует
const TextField = ({record}: {record: record}) => {
    
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
        placeholder="Значение"
        fullWidth
        value={newRecord.value ?? ""}
        onChange={(e) => setNewRecord({...newRecord, value: e.target.value})}
        onBlur={() => handleAccept()}
        inputProps={{ maxLength: 99 }}
        endAdornment={
          <InputAdornment position="end">
            <InputLenght valueLenght={newRecord.value?.length || 0} maxLength={99}/>
          </InputAdornment>
         }/> 
  )
}

export default TextField