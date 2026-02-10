import { useMutation } from "@tanstack/react-query"
import { addGroup, deleteGroup, configureGroup, configureSettings, addHabit, deleteHabit, configureHabit, newRecord, startExport, startImport } from "../api";
import { invalidateAll, invalidateWithoutDashboard } from "./onSuccess";
import { ConfigureGroup, ConfigureHabbit, NewGroup, NewHabbit } from "../types/settings/groupSettings";
import { ConfigureSettings } from "../types/settings/mainSettings";
import { NewRecord } from "../types/dashboard";
import { ExportResponse } from "../types/settings/export";


//Настройки-------------------------------------------------------------------------------
export const useDeleteGroup = () => {
  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: invalidateAll,
  });  
};

export const useAddGroup = () => {
  return useMutation({
    mutationFn: (data: NewGroup) => addGroup(data),
    onSuccess: invalidateAll,
  });  
};

export const useConfigureGroup = () => {
  return useMutation({
    mutationFn: (data: ConfigureGroup) => configureGroup(data),
    onSuccess: invalidateWithoutDashboard,
  });
}

export const useConfigureSettings = () => {
  return useMutation({
    mutationFn: (data: ConfigureSettings) => configureSettings(data),
    onSuccess: invalidateAll,
  });
}

export const useAddHabit = () => {
  return useMutation({
    mutationFn: (data: NewHabbit) => addHabit(data),
    onSuccess: invalidateAll,
  });
}

export const useDeleteHabit = () => {
  return useMutation({
    mutationFn: (id: number) => deleteHabit(id),
    onSuccess: invalidateAll,
  });
}

export const useConfigureHabit = () => {
  return useMutation({
    mutationFn: (data: ConfigureHabbit) => configureHabit(data),
    onSuccess: invalidateAll,
  });
}

//Дашборд-------------------------------------------------------------------------------
export const useNewRecord = () => {
  return useMutation({
    mutationFn: (data: NewRecord) => newRecord(data),
    onSuccess: invalidateWithoutDashboard,
  });
}

//Экспорт-импорт-------------------------------------------------------------------------------
export const useExportData = () => {
  return useMutation({
    mutationFn: startExport,
  });
}

export const useImportData = () => {
  return useMutation({
    mutationFn: (data: ExportResponse) => startImport(data),
    onSuccess: invalidateAll,
  });
}