import { useMutation } from "@tanstack/react-query";
import { addGroup, addHabit, configureGroup, configureHabit, configureSettings, deleteGroup, deleteHabit, startExport, startImport } from "../api/settingsApi";
import { invalidateAll } from "@/entities/api/mutations/onSuccess";
import { ConfigureGroup, ConfigureHabbit, NewGroup, NewHabbit } from "../api/settingsTypes/groupSettings";
import { ConfigureSettings } from "../api/settingsTypes/mainSettings";
import { ExportResponse } from "../api/settingsTypes/export";

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
    onSuccess: invalidateAll,
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