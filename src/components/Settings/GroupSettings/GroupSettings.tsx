import React from 'react'
import styles from "./GroupSettings.module.scss"
import { Button } from '@mui/material'
const GroupSettings = ({groups}) => {
  return (
    <div className={styles.GroupSettings}>Настройки групп
        {groups?.map((group, index) => (
            <div key= {`gsettings ${index}`} className={styles.group}>
                <div>
                    {group.name}
                </div>
                <Button variant="contained">Скрыть</Button>
                <Button variant="contained">Настройки</Button>
                <Button variant="contained" color='error'>Удалить</Button>
            </div>
        ))}
        <Button variant='contained' sx={{maxWidth: "20px"}}>+</Button>
    </div>

  )
}

export default GroupSettings