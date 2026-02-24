import { useEffect, useState } from 'react'
import styles from "./HabitField.module.scss"
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextField from './Fields/TextField';
import NumberField from './Fields/NumberField';
import GeneralCheckBox from './Fields/GeneralCheckBox';
import TimeFields from './Fields/TimeFields';

import { useStore } from '@/entities/ZustandStore/store';
import { Habit } from '@/entities/api/types/dashboard';
dayjs.extend(customParseFormat);


const HabitField = ({habit}: {habit: Habit}) => {
    const {selectedDate} = useStore();
    const currentRecord = habit.records.find(el => el.date === selectedDate);
    const [record, setRecord] = useState({
        habitId: habit.id,
        date: selectedDate,
        value: habit.records[0].value,
    });
    

    return (
        <div className={styles.habit}>
            <div className="smallFont1 truncated" >
                {habit.name}:
            </div>
            <div className={styles.habitField}>
                {
                habit.type === "TEXT" ?
                    <TextField record={{...record, value: String(record.value)}}/>
                : habit.type === "NUMBER" ?
                    <NumberField record={{...record, value: Number(record.value)}}/>
                : habit.type === "GENERAL" ?
                    <GeneralCheckBox record={{...record, value: Boolean(record.value)}}/>
                : habit.type === "TIME" &&
                    <TimeFields record={{...record, value: String(record.value)}}/>
                }
            </div>
        </div>
  )
}

export default HabitField