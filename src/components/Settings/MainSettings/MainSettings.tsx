"use client"
import {  Checkbox } from '@mui/material'
import { useConfigureSettings } from '@/shared/api/mutations'
import LogOutButton from '@/features/SettingsButtons/LogOutButton ';
import { SettingsConfigData } from '@/shared/api/api';
import { ExportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ExportButton';
import { ImportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ImportButton';

const MainSettings = ({settings}:{settings: SettingsConfigData}) => {
  const useConfigureSettingsMutation = useConfigureSettings();
  
  const handleShowHidden = (e: React.ChangeEvent<HTMLInputElement>) => {
    useConfigureSettingsMutation.mutate({ showHidden: e.target.checked });
  }

  return (
         <div style={{display:"flex", gap: "var(--gap)", flexWrap: "wrap"}}>
            <div style={{display: "flex", alignItems: 'center'}}>
              <p className='smallFont2'>Показывать скрытыe</p>
              <Checkbox
                onChange={(e) => handleShowHidden(e)}
                checked={settings.showHidden}
                sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}
              />
              </div>
              <div style={{display:"flex", gap: "var(--gap)"}}>
                <ExportButton/>
                <ImportButton/>
              </div>
          </div>
  )
}

export default MainSettings