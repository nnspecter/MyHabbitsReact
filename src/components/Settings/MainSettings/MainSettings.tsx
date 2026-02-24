"use client"
import { ExportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ExportButton';
import { ImportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ImportButton';
import { SettingsConfigData } from '@/entities/api/types/settings/mainSettings';
import ShowHidden from '@/features/SettingsButtons/MainSettings/ShowHidden';

interface MainSettingsProps {
  settings: SettingsConfigData;
}

const MainSettings = ({settings}: MainSettingsProps) => {
  
  return (
         <div style={{display:"flex", gap: "var(--gap)", flexWrap: "wrap"}}>
            <ShowHidden value={settings.showHidden}/>
              <div style={{display:"flex", gap: "var(--gap)"}}>
                <ExportButton/>
                <ImportButton/>
              </div>
          </div>
  )
}

export default MainSettings