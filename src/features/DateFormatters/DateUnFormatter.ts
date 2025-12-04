
export const dateUnFormatter = (date: string) => {
    let [year, month, day] = date.split("-");
    

    return {
        year: Number(year),
        month: Number(month),
        day: Number(day)
    };
}