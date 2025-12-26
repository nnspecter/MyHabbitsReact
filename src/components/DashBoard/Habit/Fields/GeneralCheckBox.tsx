import { Checkbox, Input } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNewRecord } from '../../../../api/mutations';

interface record {
  habitId: number;
  date: string;
  value: boolean;
}
//только мутирует
const GeneralCheckBox = ({record}: {record: record}) => {

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
        
            newRecordMutation.mutate(newRecord);
            console.log( "Новая запись создана");
        
    };

  return (
    <Checkbox
        checked={Boolean(newRecord.value)}
        sx={{ marginRight: 0, padding: 0, color: '#454545','&.Mui-checked': {color: '#454545',}}}
        onChange={(e) => {
            setNewRecord({...newRecord, value: e.target.checked}); 
            handleAccept();
        }}
    />
  )
}

export default GeneralCheckBox