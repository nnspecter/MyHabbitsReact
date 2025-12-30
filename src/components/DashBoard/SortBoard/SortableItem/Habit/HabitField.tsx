import { useEffect, useState } from 'react'
import styles from "./HabitField.module.scss"
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextField from './Fields/TextField';
import NumberField from './Fields/NumberField';
import GeneralCheckBox from './Fields/GeneralCheckBox';
import TimeFields from './Fields/TimeFields';
import { Habit } from '../../../../../api/api';
import { useStore } from '../../../../../ZustandStore/store';
dayjs.extend(customParseFormat);

interface HaitFieldProps{
    habit: Habit;
}

const HabitField = ({habit}: HaitFieldProps) => {
    const {selectedDate} = useStore();
    const [record, setRecord] = useState({
        habitId: habit.id,
        date: selectedDate,
        value: null,
    });
    
    useEffect(() => {
        if (!selectedDate) return;

        const currentRecord = habit.records.find(el => el.date === selectedDate);
        console.log("Current Record:", currentRecord);
        if (currentRecord) {
            setRecord(prev => ({ ...prev, value: currentRecord.value, date: selectedDate }));
        } else {
            setRecord(prev => ({ ...prev, date: selectedDate }));
        }
    }, [selectedDate, habit.records]);

    return (
        <div className={styles.habit}>
            <div className="smallFont2">
                {habit.name}:
            </div>
            <div className={styles.habitField}>
                {
                habit.type === "TEXT" ?
                    <TextField record={record}/>
                : habit.type === "NUMBER" ?
                    <NumberField record={record}/>
                : habit.type === "GENERAL" ?
                    <GeneralCheckBox record={record}/>
                : habit.type === "TIME" &&
                    <TimeFields record={record}/>
                }
                
            </div>
        </div>
  )
}

export default HabitField