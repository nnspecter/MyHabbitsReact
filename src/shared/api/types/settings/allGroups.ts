//Типы для получения всех групп с сервера
export interface GroupsSettings{
    data: HabbitsAllGroups[];
    meta: { status: string };
}

export interface HabbitsAllGroups { 
    id: number;
    name: string;
    color: string;
    hidden: boolean;
    minimized: boolean;
    position: number; 
    habits: Habit[];
}

export interface Record {
    date: string;
    value: boolean | number | string | null; 
}

export interface Habit {
    id: number;
    name: string;
    type: "GENERAL" | "NUMBER" | "TEXT" | "TIME" ; 
    hidden: boolean;
    position: number;
    records: Record[];
}