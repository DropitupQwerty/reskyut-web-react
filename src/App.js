//themes
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

//pages
import SignIn from './sign-in';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
