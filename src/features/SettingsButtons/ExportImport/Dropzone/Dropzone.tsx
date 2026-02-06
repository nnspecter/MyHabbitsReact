import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { useFileDataStore } from '@/shared/ZustandStore/ImportStore';
import { readJsonFile } from '../Functions/readJSON';


export const Dropzone = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const {setAllFileData} = useFileDataStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/json': ['.json'],
    },
    multiple: false, 
    onDrop: async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setFiles(acceptedFiles);

      const data = await readJsonFile(file);
      setAllFileData(data);
    },
  });

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed gray',
          padding: 4,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? 'Отпустите JSON файл здесь'
            : 'Перетащите JSON файл или кликните'}
        </Typography>
      </Box>

      {files && files.length > 0 && (
        <div>
          {files.map((file) => (
            <div key={file.name} style={{display: 'flex', alignItems: "center"}}>
                <FilePresentIcon sx={{color: "#454545"}} />
              <div>
                <div className='smallFont2 '>{file.name}</div>
                <div>{`${(file.size / 1024).toFixed(2)} KB`}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
