import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useImportData } from '@/shared/api/mutations/mutations';
import { downloadJson } from '../Functions/downloadJSON';
import { Dropzone } from '../Dropzone/Dropzone';
import { useFileDataStore } from '@/shared/ZustandStore/ImportStore';


export const ImportButton = () => {
    const [open, setOpen] = React.useState(false);
    const {allFileData, setAllFileData} = useFileDataStore();
    const importMutation = useImportData();
     
    
    const handleImportData = () => {
        importMutation.mutate(allFileData)
    }

    const handleLogOut = () => {
        handleImportData() 
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
          sx={{color: "#ACACAC", textTransform: 'none', background: "var(--buttonColor)", borderRadius: "10px"}}
          style={{ fontSize: "12pt", fontWeight: "700", padding: "10px", margin: "0", minWidth: 'auto',}}
        >
          <div className='smallFont2' style={{color: "var(--background)", display: "flex", justifyContent:"center"}}>
            Импорт
            <FileUploadIcon style={{fontSize: "var(--headerFontSize)"}}/>
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
          {"Импорт данных"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Импортируемые данные будут добавлены к текущим.
            Вы уверены, что хотите импортировать данные?
          </DialogContentText>
          <Dropzone/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={() => { handleClose(); handleLogOut();}} autoFocus sx={{color: "#337eaaff"}}>
            Импортировать
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

