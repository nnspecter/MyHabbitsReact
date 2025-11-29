import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import CustomTable from './Table/Table';
const HabbitsPreview = ({currentHabbits}) => {
  const {mods} = useStore();
  return (
    <div className={styles.allHabbits}>
      <div className='medFont2'>Превью всех привычек</div>
      <CustomTable dates={currentHabbits.dates} groups={currentHabbits.groups}/>
    </div>
  )
}

export default HabbitsPreview