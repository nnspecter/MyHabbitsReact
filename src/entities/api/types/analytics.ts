export interface StatsResponse {
    data: HabitStats;
    meta: { status: string, description: string };
}

export interface HabitStats {
    completion: number,
    completionCount: number,
    weekCompletion: number,
    maxStreak: number,
    maxMiss: number,
    currentStreak: number,
    currentMiss: number,
    timeData?: TimeData,
    numData?: NumberData,
    textData?: TextData,
  
}
interface TextData{
     topValues: {[key: string]: number}
} 
interface NumberData{
    max: number,
    min: number,
    avg: number,
    sum: number,
}

interface TimeData{
    max: string;
    min: string;
    avg: number;
    sum: number
}
