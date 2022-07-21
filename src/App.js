//themes
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

//pages
import SignIn from './sign-in';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import AnimalListing from './pages/animal-listing';
import AdopptionPage from './pages/adoption-page';
import AddAnimal from './pages/animallisting/addanimal';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>s{' '}
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/animallisting" element={<AnimalListing />}></Route>
          <Route path="/adoptionpage" element={<AdopptionPage />}></Route>
          {/* Animal Listing */}
          <Route
            path="/animallisting/addanimal"
            element={<AddAnimal />}
          ></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
