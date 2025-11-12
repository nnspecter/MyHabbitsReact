import { Button } from '@mui/material'
import React from 'react'
import styles from  "./MainSettings.module.scss"
const MainSettings = () => {
  return (
    <div className={styles.mainSettings}>
        <Button variant='contained'>Показывать скрытые</Button>
        <Button variant='contained' color='success'> И так далее </Button>
    </div>
  )
}

export default MainSettings