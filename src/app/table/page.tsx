"use client"
import { useAllGroups, useHabbits, useSettingsConfig } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import Header from '../../components/Header/Header'


const page = () => {
  

  return ( 
    <div className='headerDirection'>
      <Header/>
      <HabbitsPreview/>
    </div>
  )
}

export default page