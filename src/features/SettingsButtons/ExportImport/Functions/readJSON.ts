export const readJsonFile = async (file: File | null) => {
    if(file){
    const text = await file.text();
    const data = JSON.parse(text);
    return data;
    }
    return null
};