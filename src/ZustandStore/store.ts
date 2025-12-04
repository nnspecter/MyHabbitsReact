import { create } from "zustand";
import { dateFormatter } from "../features/DateFormatters/DateFormatter";
interface DateRange{
    startDate: string;
    endDate: string;
}

interface ModeStore{
    mods:Mode[],
    selectedGroupId: number | null,
    dateRange: DateRange,
    setMode: (number, boolean) => void,
    setSelectedGroupId: (number) => void,
    setDateRange: (DateRange) => void,
    updateDateRange: (event: "left" | "right") => void,
}

interface Mode{
    groupId: number,
    mode: boolean,
}

export const useStore = create<ModeStore>((set, get)=>({
    mods: [],
    selectedGroupId: null,
    dateRange: {
        startDate: "2025-10-01",
        endDate: "2025-11-10",
    },

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

    setDateRange: (newDate: DateRange) => {
        set(()=>({
            dateRange: newDate,
        }))
    },

    updateDateRange: (event)=>{
       const currentDate =  get().dateRange
        if(event==="right"){
            set(()=>({
                dateRange: {
                    startDate: dateFormatter(currentDate.startDate, 12),
                    endDate: dateFormatter(currentDate.endDate, 12)
                }
            }))
        }

        if(event==="left"){
            set(()=>({
                dateRange: {
                    startDate: dateFormatter(currentDate.startDate, -12),
                    endDate: dateFormatter(currentDate.endDate, -12)
                }
            }))
        }

    }


}))
