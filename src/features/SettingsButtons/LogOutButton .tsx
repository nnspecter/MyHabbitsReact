import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { LogOut } from '@/api/api';
import { useRouter } from 'next/navigation';


const LogOutButton = () => {
    const [open, setOpen] = React.useState(false);
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
          style={{ fontSize: "12pt", fontWeight: "700", padding: "0", margin: "0", minWidth: 'auto',}}
        >
          <div className='smallFont2' style={{color: "#AA3333", display: "flex", justifyContent:"center"}}>
            <ExitToAppIcon style={{fontSize: "var(--headerFontSize)"}}/>
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