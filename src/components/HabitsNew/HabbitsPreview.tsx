import React from 'react'
import Group from './Group/GroupNew'
import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import CustomTable from './Table/Table';
const HabbitsPreview = ({CurrentHabbits}) => {
  const {mods} = useStore();
  return (
    <div className={styles.allHabbits}>
      <div className='medFont2'>Превью всех привычек</div>
      <CustomTable dates={CurrentHabbits[0].habits[0].records} groups={CurrentHabbits}/>
    </div>
  )
}

export default HabbitsPreview