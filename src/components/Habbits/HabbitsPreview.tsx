import React from 'react'
import Group from './Group/GroupNew'
import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import DateLine from './DateLine/DateLine';
const HabbitsPreview = ({CurrentHabbits}) => {
  const {mods} = useStore();
  return (
    <div className={styles.allHabbits}>
      <div className='medFont2'>Превью всех привычек</div>
      <DateLine date={CurrentHabbits[0].habits[0].records}></DateLine>
      {CurrentHabbits.map((el, key) => (<Group group={el} key={`group-${key}`}/>))}
    </div>
  )
}

export default HabbitsPreview