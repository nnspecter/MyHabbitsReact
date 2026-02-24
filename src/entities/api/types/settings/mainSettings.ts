//Конфигурация настроек всех групп 
export interface SettingsConfig {
    data: SettingsConfigData;
    meta: { status: string };
}
export interface ConfigureSettings {
    showHidden: boolean;
}
export interface SettingsConfigData {
    showHidden: boolean;
}