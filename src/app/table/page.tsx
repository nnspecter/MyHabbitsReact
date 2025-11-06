"use client"
import { Button } from '@mui/material'
import React from 'react'
import { useHabbits } from '../../api/queries'

const page = () => {
  const {data: habbitsQuery, isPending} = useHabbits();
  if(habbitsQuery) console.log(habbitsQuery)
  return ( 
    <div>
      {isPending && <div>Загрузка</div>}
      
      { habbitsQuery && <Button variant="outlined"> Отправить запрос </Button>}
    </div>
  )
}

export default page