import { create } from "zustand";

interface ModeStore{
    mods:Mode[],
    setMode: (number, boolean) => void,
}

interface Mode{
    groupId: number,
    mode: boolean,
}

export const useStore = create<ModeStore>((set)=>({
    mods: [],
    setMode: (id: number, mode: boolean)=>{
        set((state)=>({
            mods: state.mods.find(group => group.groupId===id)
                ? (state.mods.map((el)=> (el.groupId === id ? {...el, mode} : el)))
                : [...state.mods, {groupId: id, mode}] 
        }))
        console.log(mode);
    }
}))
