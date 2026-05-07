import { useState } from "react";
import { DayPicker } from "react-day-picker";
import dayjs from 'dayjs';
import { ru } from "date-fns/locale";
import { useStore } from "@/entities/ZustandStore/store";

export const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  const{setDate, selectedDate} = useStore(); //

  const handleDate = (date: Date | undefined) => {
    setSelected(date);
    const formatted = dayjs(date).format('YYYY-MM-DD'); 
    setDate(formatted);
  }

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      locale={ru}
      onSelect={(date)=> handleDate(date)}
      
    />
  );
}

