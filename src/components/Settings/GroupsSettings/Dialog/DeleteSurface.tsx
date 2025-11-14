import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import React, { use, useEffect } from 'react'
import { useDeleteGroup } from '../../../../api/mutations';

const DeleteResponsive = ({groupId}) => {
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
        <Button variant="contained" color='error' onClick={handleClickOpen}>Удалить</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
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
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={() => { handleClose(); handleDelete(groupId);}} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DeleteResponsive