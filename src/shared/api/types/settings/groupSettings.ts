
//Новая группа
export interface NewGroup {
    name: string;
    color: string;
}

// Конфигурация группы
export interface ConfigureGroup {
    groupId: number;
    name?: string;
    color?: string;
    hidden?: boolean;
    minimized?: boolean;
    orderedIds?: number[];
}


//Создание новой привычки
export interface NewHabbit {
    groupId: number;
    name: string;
    type: "GENERAL" | "NUMBER" | "TEXT" | "TIME";
    hidden: boolean;
    schedule: "EVERYDAY" | "IN_DAY" | "N_WEEK" | "N_MONTH" //+
    scheduleN: number; // +

}

//Настройка привычки
export interface ConfigureHabbit {
    groupId: number;
    habitId: number;
    name?: string;
    type?: "GENERAL" | "NUMBER" | "TEXT" | "TIME";
    hidden?: boolean;
    scheduleN?: number; // +

}
