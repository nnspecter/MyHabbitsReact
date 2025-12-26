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

    const handleAccept = (checked) => {
        console.log("Accepted value:", newRecord);
            setNewRecord({...newRecord, value: checked}); 
            newRecordMutation.mutate({...newRecord, value: checked});
            console.log( "Новая запись создана");
        
    };

  return (
    <Checkbox
        checked={Boolean(newRecord.value)}
        sx={{ marginRight: 0, padding: 0, color: '#454545','&.Mui-checked': {color: '#454545',}}}
        onChange={(e) => {
            handleAccept(e.target.checked);
        }}
    />
  )
}

export default GeneralCheckBox