import React from 'react'
import Group from './Group/Group'
import styles from "./Habbits.module.scss"
const HabbitsPreview = ({CurrentHabbits}) => {
  return (
    <div className={styles.allHabbits}>
      <div className='medFont2'>Превью всех привычек</div>
      {CurrentHabbits.map((el, key) => (
        <Group group={el} key={`group-${key}`}/>
      ))}
    </div>
  )
}

export default HabbitsPreview