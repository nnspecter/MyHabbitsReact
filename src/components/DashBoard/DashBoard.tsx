import styles from "./DashBoard.module.scss"

const DashBoard = ({groups}) => {
  console.log(groups)
  return (
    <div className={styles.dashBoard}>
        <div className="medFont2">
            Запись привычек
        </div>
        Выберите привычку:
        <div className={styles.habitGroups}>
          {groups.map((el, groupKey) => (
            <div className={styles.Groups} key={`dashboardGroupKey-${groupKey}`}>
              <div className="medFont1">{el.name}:</div>
              {el.habits.map((habit, habitKey)=> (
                <div className={styles.Habits} key={`dashboardHabitKey-${habitKey}`}>
                  {habit.name}
                </div>
              ))}
            </div>
          ))}
        </div>
    </div>
  )
}

export default DashBoard