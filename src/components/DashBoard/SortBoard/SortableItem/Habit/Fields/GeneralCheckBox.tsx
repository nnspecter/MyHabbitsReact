import { Checkbox} from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { useNewRecord } from '@/entities/api/mutations/mutations';


interface record {
  habitId: number;
  date: string;
  value: boolean;
}
//только мутирует
const GeneralCheckBox = ({record}: {record: record}) => {

    const newRecordMutation = useNewRecord();
    const[newRecord, setNewRecord] = useState(record);
     const isFirstRender = useRef(true);
    
      useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        };
        if (newRecord.value === record.value) return;
        const timer = setTimeout(() => {
          newRecordMutation.mutate(newRecord);
          console.log(record.habitId + "GeneralCheckBox ")
        }, 1000);
        return () => clearTimeout(timer);
        }, [newRecord]);

    const handleAccept = (checked: boolean) => {
        console.log("Accepted value:", newRecord);
            setNewRecord({...newRecord, value: checked}); 
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