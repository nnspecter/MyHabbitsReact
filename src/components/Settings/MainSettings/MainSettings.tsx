import { Button, Checkbox } from '@mui/material'
import React from 'react'
import styles from  "./MainSettings.module.scss"
import { useConfigureSettings } from '../../../api/mutations'
const MainSettings = ({settings}) => {
  const useConfigureSettingsMutation = useConfigureSettings();
  
  const handleShowHidden = (e) => {
    useConfigureSettingsMutation.mutate({ showHidden: e.target.checked });
  }

  return (
    <div className={styles.mainSettings}>
         <div className={styles.HiddenCheckbox}>Показывать скрытыe <Checkbox onChange={(e) => handleShowHidden(e)} checked={settings.showHidden}/></div>
    </div>
  )
}

export default MainSettings