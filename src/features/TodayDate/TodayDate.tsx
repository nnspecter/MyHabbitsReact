import dayjs from "dayjs";

export const todayDate = (date: string) => {
    const today = dayjs(new Date()).format("DD.MM.YYYY");
    if(date === today) return true;
    else return false;
  }
