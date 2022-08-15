//themes
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

//shelter admin pages
import SignIn from './sign-in';
import Dashboard from './pages/ShelterAdmin/dashboard';
import Profile from './pages/ShelterAdmin/profile';
import AnimalListing from './pages/ShelterAdmin/animal-listing';
import AdopptionPage from './pages/ShelterAdmin/adoption-page';
import AddAnimal from './pages/ShelterAdmin/animallisting/addanimal';
import EditAnimal from './pages/ShelterAdmin/animallisting/editanimal';
import Message from './pages/ShelterAdmin/message';

//Super admin pages
import SaDashboard from './pages/SuperAdmin/sadashboard';
import ListOfNGO from './pages/SuperAdmin/listofngo';
import PostOfNGO from './pages/SuperAdmin/postofngo';
import SaSignIn from './pages/SuperAdmin/sasign-in';
import AddNgo from './pages/SuperAdmin/addngo';
import ViewNgo from './pages/SuperAdmin/viewngo';
import ViewAnimal from './pages/SuperAdmin/viewanimal';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PagenotFound from './PagenotFound';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Shelter Admin */}

        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/animallisting" element={<AnimalListing />}></Route>
          <Route path="/adoptionpage" element={<AdopptionPage />}></Route>
          <Route path="/message" element={<Message />}></Route>
          {/* Animal Listing */}
          <Route
            path="/animallisting/addanimal"
            element={<AddAnimal />}
          ></Route>
          <Route
            path="/animallisting/editanimal"
            element={<EditAnimal />}
          ></Route>
          {/* Super Admin */}
          <Route path="/admin" element={<SaSignIn />}></Route>
          <Route path="/admin/dashboard" element={<SaDashboard />}></Route>
          <Route path="/admin/postofngo" element={<PostOfNGO />}></Route>
          <Route path="/admin/addngo" element={<AddNgo />}></Route>
          <Route path="/admin/listofngo" element={<ListOfNGO />}></Route>
          <Route
            path="/admin/listofngo/viewngo/:id"
            element={<ViewNgo />}
          ></Route>

          <Route exact path="/admin/viewanimal" />
          {/* Page not Found */}
          <Route path="*" element={<PagenotFound />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
