"use client"
import { ExportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ExportButton';
import { ImportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ImportButton';
import ShowHidden from '@/features/SettingsButtons/MainSettings/ShowHidden';
import { SettingsConfigData } from '../../api/settingsTypes/mainSettings';

interface MainSettingsProps {
  settings: SettingsConfigData;
}

const MainSettings = ({settings}: MainSettingsProps) => {
  
  return (
         <div style={{display:"flex", gap: "var(--gap)", alignItems: "center" }}>
            <ShowHidden value={settings.showHidden}/>
              <div style={{display:"flex", gap: "var(--gap)"}}>
                <ExportButton/>
                <ImportButton/>
              </div>
          </div>
  )
}

export default MainSettings