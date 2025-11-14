"use client"
import { Button } from '@mui/material'
import React from 'react'
import { useHabbits } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import SettingsPreview from '../../components/Settings/SettingsPreview'
import GroupSettings from '../../components/GroupSettings/GroupSettings'

const page = () => {
  const {data: habbitsQuery, isPending} = useHabbits();
  if(habbitsQuery) console.log(habbitsQuery);
  return ( 
    <div>
      {isPending && <div>Загрузка</div>}
      
      { habbitsQuery && <HabbitsPreview CurrentHabbits={habbitsQuery.data}/> }
      { habbitsQuery && <SettingsPreview CurrentHabbits={habbitsQuery.data}/> }
      { habbitsQuery && <GroupSettings/> }
      

    </div>
  )
}

export default page