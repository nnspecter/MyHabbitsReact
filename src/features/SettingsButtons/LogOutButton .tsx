import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { useDeleteHabit } from '../../api/mutations';
import { useMutation } from '@tanstack/react-query';

import { LogOut } from '../../api/api';
import { useRouter } from 'next/navigation';

const LogOutButton = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const logOutMutation = useMutation({
    mutationFn: () => LogOut(),  
    onSuccess: () => {
        router.push("/login");
    },
    onError: (error) => {
        console.error(error);
    }
    });
      
    const handleLogOut = () => {
        logOutMutation.mutate();  
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <React.Fragment>
        <Button 
          variant="text"
          onClick={handleClickOpen}
          sx={{color: "#AA3333", textTransform: 'none'}}
          style={{ fontSize: "12pt", fontWeight: "700", borderRadius: "10px"}}
        >
          <div className='smallFont2' style={{color: "#AA3333"}}>
            Выйти
          </div>
        </Button>
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
          {"Выйти из аккаунта?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите выйти из учетной записи?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={() => { handleClose(); handleLogOut();}} autoFocus sx={{color: "#AA3333"}}>
            Выйти
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default LogOutButton