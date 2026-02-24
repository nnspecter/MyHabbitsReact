import { Input, InputAdornment } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { useNewRecord } from '@/entities/api/mutations/mutations';
import InputLenght from '@/features/Input/InputLenght';
import { uiSettingsStore } from '@/entities/ZustandStore/uiSettingsStore';

interface Record {
  habitId: number;
  date: string;
  value: string | null;
}


const TextField = ({record}: {record: Record}) => {
    const {dashboardMaxLenght} = uiSettingsStore();
    const newRecordMutation = useNewRecord();
    const[newRecord, setNewRecord] = useState(record);
    const isFirstRender = useRef(true);
        
    useEffect(() => {
      if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
      };
      
      const timer = setTimeout(() => {
        if (record.value !== newRecord.value) {
            newRecordMutation.mutate(newRecord)
        }
      }, 1000);
    return () => clearTimeout(timer);
    }, [newRecord]);

    

  return (
    <Input
        placeholder="Значение"
        fullWidth
        value={newRecord.value ?? ""}
        onChange={(e) => setNewRecord({...newRecord, value: e.target.value})}
        inputProps={{ maxLength: dashboardMaxLenght }}
        endAdornment={
          <InputAdornment position="end">
            <InputLenght valueLenght={newRecord.value?.length || 0} maxLength={dashboardMaxLenght}/>
          </InputAdornment>
         }/> 
  )
}

export default TextField