"use client"
import { Skeleton } from '@mui/material'
import { useAllGroups, useHabbits, useSettingsConfig } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import Header from '../../components/Header/Header'


const page = () => {
  
  
  return ( 
      <HabbitsPreview/>
  )
}

export default page