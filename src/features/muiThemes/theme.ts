import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 'var(--sFontSize)',
          '&::placeholder': {
            fontSize: 'var(--sFontSize)',
          },
        },
      },
    },
  },
});
