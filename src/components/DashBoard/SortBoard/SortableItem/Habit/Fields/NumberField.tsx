import { Input } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNewRecord } from '../../../../../../api/mutations';


interface record {
  habitId: number;
  date: string;
  value: number | null | string;
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
        const finalValue = newRecord.value === "" ? null : Number(newRecord.value);
        console.log("Accepted value:", newRecord);
        
        if (record.value !== newRecord.value) {
            newRecordMutation.mutate({...newRecord, value: finalValue});
            console.log( "Новая запись создана");
        }
    };
    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value==="") {
          setNewRecord({...newRecord, value: ""});
          return;
        } 
        const numberValue = Number(value);
        if (!isNaN(numberValue) && numberValue < 999999999 && numberValue > -999999999) {
          setNewRecord({...newRecord, value: value});
        }
        
    }
    
  return (
    <Input
        type='number'
        placeholder="Число"
        fullWidth
        inputProps={{ max: 999999999, min: -999999999, }}
        value={newRecord.value || ""}
        onChange={handleChange}
        onBlur={() => handleAccept()}
    />
  )
}

export default NumberField