import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useExportData } from '@/shared/api/mutations';
import { downloadJson } from '../Functions/downloadJSON';


export const ExportButton = () => {
    const [open, setOpen] = React.useState(false);
    
    const exportMutation = useExportData();
      
    const handleExport = () => {
        exportMutation.mutate(undefined, {
            onSuccess: (data) => {
                downloadJson(data, 'habits-export.json');
            },
        });
    }

    const handleLogOut = () => {
        handleExport() 
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
          <div className='smallFont2' style={{color: "#337eaaff", display: "flex", justifyContent:"center"}}>
            <FileDownloadIcon style={{fontSize: "var(--headerFontSize)"}}/>
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
          {"Экспорт данных"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите экспортировать данные? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={() => { handleClose(); handleLogOut();}} autoFocus sx={{color: "#337eaaff"}}>
            Экспортировать
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

