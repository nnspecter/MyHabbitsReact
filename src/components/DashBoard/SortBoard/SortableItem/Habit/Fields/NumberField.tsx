import { Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { useNewRecord } from '@/shared/api/mutations/mutations';


interface record {
  habitId: number;
  date: string;
  value: number | null | string;
}

const NumberField = ({record}: {record: record}) => {
    const newRecordMutation = useNewRecord();
    const[newRecord, setNewRecord] = useState(record);
    const isFirstRender = useRef(true);
            
        useEffect(() => {
          if (isFirstRender.current) {
              isFirstRender.current = false;
              return;
          };
          
          const timer = setTimeout(() => {
            const finalValue = newRecord.value === "" ? null : Number(newRecord.value);
            if (record.value !== newRecord.value) {
                newRecordMutation.mutate({...newRecord, value: finalValue})
            }
          }, 1000);
        return () => clearTimeout(timer);
        }, [newRecord]);

    
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
    />
  )
}

export default NumberField