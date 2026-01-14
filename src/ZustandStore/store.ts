import { create } from "zustand";
import { dateFormatter } from "@/features/DateFormatters/DateFormatter";
import dayjs from "dayjs";


interface DateRange{
    startDate: string;
    endDate: string;
}

interface ModeStore{
    mods:Mode[],
    selectedGroupId: number | null,
    selectedDate: string,
    selectedTableDate: string,
    selectedHabitId: number | null,
    setMode: (id: number, mode: boolean) => void,
    setSelectedGroupId: (id: number) => void,
    setDate: (newDate: string) => void,
    setTableDate: (newDate: string) => void,
    updateDateRange: (event: "left" | "right") => void,
    setSelectedHabitId: (habitId: number) => void,
}

interface Mode{
    groupId: number,
    mode: boolean,
}

export const useStore = create<ModeStore>((set, get)=>({
    mods: [],
    selectedGroupId: null,
    selectedDate: dayjs(new Date()).format("YYYY-MM-DD"), //2024-10-05-DD
    selectedTableDate: dayjs(new Date()).format("YYYY-MM-DD"),
    selectedHabitId: null,

    setMode: (id: number, mode: boolean)=>{
        set((state)=>({
            mods: state.mods.find(group => group.groupId===id)
                ? (state.mods.map((el)=> (el.groupId === id ? {...el, mode} : el)))
                : [...state.mods, {groupId: id, mode}] 
        }))
        console.log(mode);
    },

    setSelectedGroupId: (id: number)=>{
        set(()=>({
            selectedGroupId: id
        }))
        console.log(`Выбранная группа: ${id}`);
    },

    setDate: (newDate: string) => {
        set(()=>({
            selectedDate: newDate,
        }))
        console.log("Дата дашборда установлена на ", newDate)
    },
    setTableDate: (newDate: string) => {
        set(()=>({
            selectedTableDate: newDate,
        }))
        console.log("Дата таблицы установлена на ", newDate)
    },

    updateDateRange: (event)=>{
        if(event==="right"){
            set(()=>({
                selectedTableDate: dateFormatter(get().selectedTableDate, 20)
            }))
        }

        if(event==="left"){
            set(()=>({
                selectedTableDate: dateFormatter(get().selectedTableDate, -20)
            }))
        }

    },
    setSelectedHabitId: (habitId: number)=>{
        set(()=>({
            selectedHabitId: habitId,
        }))
        console.log("Выбранная привычка: ", habitId)
}
}))
