import React, { useEffect, useState } from 'react'
import { Habit, Record } from '../../../api/api'
import styles from "./HabitField.module.scss"
import { Checkbox, Input } from '@mui/material';
import { useStore } from '../../../ZustandStore/store';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNewRecord } from '../../../api/mutations';
dayjs.extend(customParseFormat);

interface HaitFieldProps{
    habit: Habit;
}

const HabitField = ({habit}: HaitFieldProps) => {
    
    const {selectedDate} = useStore();
    const newRecordMutation = useNewRecord();
    const [record, setRecord] = useState({
        habitId: habit.id,
        date: selectedDate,
        value: null,
    });

    

    const handleValueChange = (newValue: string | number | boolean) => {
        setRecord(prev => ({...prev, value: newValue}))
        console.log(newValue)
        if(habit.type==="GENERAL" && typeof newValue === "boolean"){
             newRecordMutation.mutate({ ...record, value: newValue });
             console.log( "Новая запись boolean создана");
        }
    };

    useEffect(() => {
        if (!selectedDate) return;

        const currentRecord = habit.records.find(el => el.date === selectedDate);
        if (currentRecord) {
            setRecord(prev => ({ ...prev, value: currentRecord.value, date: selectedDate }));
        } else {
            setRecord(prev => ({ ...prev, date: selectedDate }));
        }
    }, [selectedDate, habit.records]);


    const handleAccept = (value: string | boolean | number) => {
        const currentRecord = habit.records.find(el => el.date === record.date);

        const newValue =
            habit.type === "NUMBER"
                ? record.value === 0 || record.value === ""
                    ? null
                    : Number(record.value)
                : record.value;

        // если записи нет или значение изменилось — мутируем
        if (currentRecord && currentRecord.value !== newValue) {
            newRecordMutation.mutate({ ...record, value: newValue });
            console.log( "Новая запись создана");
        }

        console.log("потеря фокуса");   
    };


    return (
        <div className={styles.habit}>
            <div className="smallFont2">
                {habit.name}:
            </div>
            <div className={styles.habitField}>
                {
                habit.type === "TEXT" ?
                
                    <Input
                        placeholder="Значение"
                        fullWidth
                        onChange={(e) => handleValueChange(e.target.value)}
                        value={record.value ?? ''} // ?? '' для контроля
                        onBlur={()=> handleAccept(record.value)}
                    />
            
                : habit.type === "NUMBER" ?
                    
                        <Input
                            placeholder="Значение"
                            type="number"
                            fullWidth
                            onChange={(e) => handleValueChange(e.target.value)}
                            value={record.value ?? ''} // ?? '' для контроля
                            onBlur={()=> handleAccept(record.value)}
                        />
                    
                : habit.type === "GENERAL" &&
                    <div>
                        <Checkbox
                            checked={Boolean(record.value)}
                            onChange={(e) => handleValueChange(e.target.checked)}
                            sx={{ marginRight: 0, padding: 0, color: '#454545','&.Mui-checked': {color: '#454545',}}}
                        />
                    </div>
                }
                
            </div>
        </div>
  )
}

export default HabitField