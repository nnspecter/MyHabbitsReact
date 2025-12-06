import { Popover } from '@varld/popover';
import styles from './PopOver.module.scss';
import { DatePicker } from './DatePicker';
import { Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export const PopOver = () => {
  return (
    <div className={styles.app}>
      <Popover
        popover={({ visible, close }) => {
          return (
            <div className={styles.popover}>
              <DatePicker/>
            </div>
          );
        }}
      >
        <Button sx={{padding: 0, margin: 0, minWidth: 0, width: "auto"}}><BorderColorIcon/></Button>
      </Popover>
    </div>
  );
}
