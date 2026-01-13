import { MountAnimation } from "@/animations/MountAnimation"
import styles from "./GraphicsPanel.module.scss"
import GraphicsBlock from "./Previews/GraphicsBlock"

const GraphicsPanel = () => {
  return (
    <MountAnimation>
        <div className="container">
            <div className={styles.head}>
                <div className={styles.center}>
                    <div className="medFont2">
                        Графики и аналитика
                    </div>
                </div>
                <div className={styles.right}>
                    <div className="date">
                        Календарь аналитики
                        <div className="medFont0">
                            {/*{date} {todayDate(date) && <>{"(сегодня)"}</>}}*/}
                        </div>
                    </div> 
                </div>
            </div>
            <div className={styles.blocksContainer}>
                <GraphicsBlock/>
                <GraphicsBlock/>
            </div>
        </div>

    </MountAnimation>
  )
}

export default GraphicsPanel