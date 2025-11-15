import { Button, Checkbox } from '@mui/material'
import React from 'react'
import DeleteButton from '../../../features/SettingsButtons/DeleteButton'
import HiddenCheckbox from '../../../features/SettingsButtons/HiddenCheckbox'

const CurrentSettings = ({group}) => {

  return (
    <div>
      <Button variant='contained'>Цвет группы</Button>
      <>Скрывать группу <HiddenCheckbox id={group.id} hidden={group.hidden}/></>
      <DeleteButton groupId={group.id}/>
      
    </div>
  )
}

export default CurrentSettings