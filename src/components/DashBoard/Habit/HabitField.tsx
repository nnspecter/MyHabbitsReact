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
    const {selectedDate: startDate} = useStore();
    const [date, setDate] = useState<string>(
        dayjs(startDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    const newRecordMutation = useNewRecord();
    const [record, setRecord] = useState({
        habitId: habit.id,
        date: date,
        value: null,
    });

    

    const handleValueChange = (newValue: string | number | boolean) => {
        setRecord(prev => ({...prev, value: newValue}))
        console.log(newValue)
    };

    useEffect(() => {
        if (!startDate) return;

        const formattedDate = dayjs(startDate, "DD-MM-YYYY").format("YYYY-MM-DD");

        const currentRecord = habit.records.find(el => el.date === formattedDate);
        if (currentRecord) {
            setRecord(prev => ({ ...prev, value: currentRecord.value, date: formattedDate }));
        } else {
            setRecord(prev => ({ ...prev, date: formattedDate }));
        }
    }, [startDate, habit.records]);


    const handleAccept = (value: string) => {
        const currentRecord = habit.records.find(el => el.date === record.date);

        const newValue =
            habit.type === "NUMBER"
                ? record.value === 0 || record.value === ""
                    ? null
                    : Number(record.value)
                : record.value;

        // если записи нет или значение изменилось — мутируем
        if (!currentRecord || currentRecord.value !== value) {
            newRecordMutation.mutate({ ...record, value: newValue });
            console.log(!currentRecord ? "Новая запись создана" : "Существующая запись обновлена");
        }

        console.log("потеря фокуса");   
    };


    return (
        <div className={styles.habit}>
            <div className={styles.habitName}>
                {habit.name}:
            </div>
            <div className={styles.habitField}>
                {
                habit.type === "TEXT" ?
                <div className={styles.input}>
                    <Input
                        placeholder="Значение"
                        fullWidth
                        onChange={(e) => handleValueChange(e.target.value)}
                        value={record.value ?? ''} // ?? '' для контроля
                        onBlur={()=> handleAccept(record.value)}
                    />
                </div>
                : habit.type === "NUMBER" ?
                    <div className={styles.input}>
                        <Input
                            placeholder="Значение"
                            type="number"
                            fullWidth
                            onChange={(e) => handleValueChange(e.target.value)}
                            value={record.value ?? ''} // ?? '' для контроля
                            onBlur={()=> handleAccept(record.value)}
                        />
                    </div>
                : habit.type === "GENERAL" &&
                    <div>
                        <Checkbox
                            checked={Boolean(record.value)}
                            onChange={(e) => handleValueChange(e.target.checked)}
                        />
                    </div>
                }
                
            </div>
        </div>
  )
}

export default HabitField