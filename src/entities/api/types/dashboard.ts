//Тип для записи новой привычки в дашборде
export interface NewRecord{
    habitId: number;
    date: string;
    value: number | string | boolean
}

//Типы для получения данных для дашборда
export interface DashboardData {
    startDate: string;
    endDate: string;
}

export interface DashboardResponse {
    data: Data;
    meta: { status: string };
}

interface Data {
    groups: HabitsGroup[];
    dates: string[];
}

export interface HabitsGroup { 
    id: number;
    name: string;
    color: string;
    hidden: boolean;
    minimized: boolean;
    position: number;
    habits: Habit[]; 
}

export interface Habit {
    id: number;
    name: string;
    type: "GENERAL" | "NUMBER" | "TEXT" | "TIME" ; 
    hidden: boolean;
    position: number;
    records: Record[];
    motivations: string[]; 
}

export interface Record {
    date: string;
    value: boolean | number | string | null; 
}


