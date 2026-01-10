"use client"
import {  Checkbox } from '@mui/material'
import { useConfigureSettings } from '../../../api/mutations'
const MainSettings = ({settings}) => {
  const useConfigureSettingsMutation = useConfigureSettings();
  
  const handleShowHidden = (e) => {
    useConfigureSettingsMutation.mutate({ showHidden: e.target.checked });
  }

  return (
         <div>
            Показывать скрытыe
            <Checkbox
              onChange={(e) => handleShowHidden(e)}
              checked={settings.showHidden}
              sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}
              />
          </div>
  )
}

export default MainSettings