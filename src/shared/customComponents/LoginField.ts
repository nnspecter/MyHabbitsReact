import { styled, TextField } from "@mui/material";

export const CssTextField = styled(TextField)({
    width: '300px',
    
    '& label': {
      color: '#454545', // обычный цвет label
    },
    '& label.Mui-focused': {
      color: '#454545', // цвет label при фокусе
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#454545', // для standard варианта
    },
    
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: '#454545', // **текст, который вводит пользователь**
      },
      '& input::placeholder': {
        color: '#686868ff', // placeholder
        opacity: 1,
      },
      // autofill
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px rgba(0,0,0,0) inset', // прозрачный
        WebkitTextFillColor: '#454545', // цвет текста
        transition: 'background-color 5000s ease-in-out 0s', // обманка для Chrome
      }, 
      '& fieldset': {
        borderColor: '#454545', // обычная рамка
        borderRadius: '10px',
      },
      '&:hover fieldset': {
        borderColor: '#454545', // рамка при наведении
        borderRadius: '10px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#454545', // рамка при фокусе
      },
    },
  });
