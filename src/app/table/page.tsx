"use client"
import { Button } from '@mui/material'
import React from 'react'
import { useHabbits } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'

const page = () => {
  const {data: habbitsQuery, isPending} = useHabbits();
  if(habbitsQuery) console.log(habbitsQuery)
  return ( 
    <div>
      {isPending && <div>Загрузка</div>}
      
      { habbitsQuery && <HabbitsPreview CurrentHabbits={habbitsQuery.data}/>}
    </div>
  )
}

export default page