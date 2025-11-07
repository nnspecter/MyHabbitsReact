import React from 'react'
import styles from "./Record.module.scss"
const Record = ({records}) => {
  return (
    <div className={styles.record}>
        {records.value}
    </div>
  )
}

export default Record