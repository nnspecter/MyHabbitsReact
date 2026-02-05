"use client"
import {  Checkbox } from '@mui/material'
import { useConfigureSettings } from '@/shared/api/mutations'
import LogOutButton from '@/features/SettingsButtons/LogOutButton ';
import { SettingsConfigData } from '@/shared/api/api';
import { ExportButton } from '@/features/SettingsButtons/ExportImport/Buttons/ExportButton';

const MainSettings = ({settings}:{settings: SettingsConfigData}) => {
  const useConfigureSettingsMutation = useConfigureSettings();
  
  const handleShowHidden = (e: React.ChangeEvent<HTMLInputElement>) => {
    useConfigureSettingsMutation.mutate({ showHidden: e.target.checked });
  }

  return (
         <div style={{display:"flex"}}>
            <p className='smallFont2'>Показывать скрытыe</p>
            <Checkbox
              onChange={(e) => handleShowHidden(e)}
              checked={settings.showHidden}
              sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}
              />
              <ExportButton/>
              
          </div>
  )
}

export default MainSettings