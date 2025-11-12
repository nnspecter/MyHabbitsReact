"use client"
import { Button } from '@mui/material'
import React from 'react'
import { useHabbits } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import SettingsPreview from '../../components/Settings/SettingsPreview'

const page = () => {
  const {data: habbitsQuery, isPending} = useHabbits();
  if(habbitsQuery) console.log(habbitsQuery.data.groups);
  return ( 
    <div>
      {isPending && <div>Загрузка</div>}
      
      { habbitsQuery && <HabbitsPreview CurrentHabbits={habbitsQuery.data}/> }
      { habbitsQuery && <SettingsPreview CurrentHabbits={habbitsQuery.data}/> }
      

    </div>
  )
}

export default page