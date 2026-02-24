import { create } from "zustand";
import { ExportResponse } from "../api/types/settings/export";


//хранилище экспортируемых данных
interface FileDataStore{
    allFileData: ExportResponse | null;
    setAllFileData: (data: ExportResponse) => void
}

export const useFileDataStore = create<FileDataStore>((set, get)=>({
    allFileData: null,
    setAllFileData: (data: ExportResponse) =>{
        set({allFileData: data});
        console.log(data)
    }
}))

