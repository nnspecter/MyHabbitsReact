import { Popover } from '@varld/popover';
import styles from './TablePopOver.module.scss';
import { TableDatePicker } from './TableDatePicker';
import { Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export const TablePopOver = () => {
  return (
    <div className={styles.app}>
      <Popover
        popover={({ visible, close }) => {
          return (
            <div className={styles.popover}>
              <TableDatePicker/>
            </div>
          );
        }}
      >
        
        <Button sx={{padding: 0, margin: 0, minWidth: 0, width: "auto"}}><CalendarMonthIcon sx={{color: "#454545",}}/></Button>
      </Popover>
    </div>
  );
}
