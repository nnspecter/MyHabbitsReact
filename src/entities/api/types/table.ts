
export interface HabitsResponse {
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

export interface HabitsData {
    startDate: string;
    endDate: string;
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