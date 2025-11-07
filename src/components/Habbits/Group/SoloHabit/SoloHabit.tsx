import React from 'react'
import styles from "./SoloHabbit.module.scss"
import Record from './Record/Record'
const SoloHabit = ({habit}) => {
  return (
    <div className={styles.soloHabit}>
      <div className={styles.habitName}>
        {habit.name}
      </div>
      <div className={styles.records}>
        {
          habit.records.map((el, key) => (
            <Record records = {el} key={`record-${key}`}/>
          ))
        }
      </div>
    </div>
  )
}

export default SoloHabit