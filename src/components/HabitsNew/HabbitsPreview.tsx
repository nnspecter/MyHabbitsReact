import React from 'react'

import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import CustomTable from './Table/Table';
const HabbitsPreview = ({CurrentHabbits}) => {
  const {mods} = useStore();
  return (
    <div className={styles.allHabbits}>
      <div className='medFont2'>Превью всех привычек</div>
      <CustomTable dates={CurrentHabbits.groups[0].habits[0].records} groups={CurrentHabbits.groups}/>
    </div>
  )
}

export default HabbitsPreview