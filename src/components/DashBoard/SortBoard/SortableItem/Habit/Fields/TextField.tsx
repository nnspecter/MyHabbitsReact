import { Input, InputAdornment } from '@mui/material';
import { useState } from 'react'
import { useNewRecord } from '@/shared/api/mutations/mutations';
import InputLenght from '@/features/Input/InputLenght';
import { uiSettingsStore } from '@/shared/ZustandStore/uiSettingsStore';

interface Record {
  habitId: number;
  date: string;
  value: string | null;
}

//Компонент с кастомизированным mui Input 
//После монтирования отображает исходные данные если они есть
//Добавлен кастомный ограничитель
//запись происходит без кнопок при анфокусе инпута.

const TextField = ({record}: {record: Record}) => {
    const {dashboardMaxLenght} = uiSettingsStore();
    const newRecordMutation = useNewRecord();
    const[newRecord, setNewRecord] = useState({
      habitId: record.habitId,
      date: record.date,
      value: record.value
    });

    const handleAccept = () => {        
        if (record.value !== newRecord.value) {
            newRecordMutation.mutate(newRecord)
        }
    };

  return (
    <Input
        placeholder="Значение"
        fullWidth
        value={newRecord.value ?? ""}
        onChange={(e) => setNewRecord({...newRecord, value: e.target.value})}
        onBlur={() => handleAccept()}
        inputProps={{ maxLength: dashboardMaxLenght }}
        endAdornment={
          <InputAdornment position="end">
            <InputLenght valueLenght={newRecord.value?.length || 0} maxLength={dashboardMaxLenght}/>
          </InputAdornment>
         }/> 
  )
}

export default TextField