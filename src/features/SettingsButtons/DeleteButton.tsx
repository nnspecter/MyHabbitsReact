import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { useDeleteGroup } from '@/shared/api/mutations/mutations';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SettingsStyledButton } from '@/features/muiThemes/SettingsStyledButton';


const DeleteButton = ({groupId}: {groupId: number}) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const deleteMutation = useDeleteGroup();
      
    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
        console.log("Delete group", id);  
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <React.Fragment>
        <SettingsStyledButton
          variant="contained"
          onClick={handleClickOpen}
          sx={{background: "#AA3333"}}

          >
          <div className='smallFont1' style={{color: "#ffff", display: "flex"}}><DeleteForeverIcon/></div>
        </SettingsStyledButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#D9D9D9",
            color: "#454545",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Удалить группу?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Если вы удалите группу, то все привычки из этой группы также будут удалены. Вы уверены, что хотите удалить эту группу?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={() => { handleClose(); handleDelete(groupId);}} sx={{color: "#AA3333"}} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DeleteButton