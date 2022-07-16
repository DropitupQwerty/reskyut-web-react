import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#E94057',
      main: '#E94057',
      dark: 'rgba(64, 83, 67, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: '#E94057',
      main: 'rgba(228, 233, 190, 1)',
      dark: 'rgba(173, 178, 136, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export default theme;
