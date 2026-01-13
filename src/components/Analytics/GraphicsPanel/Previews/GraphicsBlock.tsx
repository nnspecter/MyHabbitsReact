import styles from './GraphicsBlock.module.scss';
import PieChartWithCustomizedLabel from './GraphicsTypes/RoundedDiagram';

const GraphicsBlock = () => {
  return (
    <div className={styles.analyticsContainer}>
      
      <div className={styles.diagram}>
        <PieChartWithCustomizedLabel/> 
      </div>  
      <div className={styles.data}>
        Данные по привычкам
      </div>
    </div>
  )
}

export default GraphicsBlock