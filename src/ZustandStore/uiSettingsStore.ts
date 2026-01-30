import { create } from "zustand";

interface UiSettingsStore{
    dashboardMaxLenght: number
}

export const uiSettingsStore = create<UiSettingsStore>((set, get)=>({
    dashboardMaxLenght: 99,
    
}))
//Компонент с кастомизированным mui Input 
//После монтирования отображает исходные данные если они есть
//Добавлен кастомный ограничитель
//запись происходит без кнопок при анфокусе инпута.
