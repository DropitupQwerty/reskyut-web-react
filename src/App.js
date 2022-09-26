//themes
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

//shelter admin pages
import AnimalListing from './pages/ShelterAdmin/animallisting/animal-listing';
import AddAnimal from './pages/ShelterAdmin/animallisting/addanimal';

import EditAnimal from './pages/ShelterAdmin/animallisting/editanimal';
import SignIn from './sign-in';
import Dashboard from './pages/ShelterAdmin/dashboard';
import Profile from './pages/ShelterAdmin/profile';
import AdopptionPage from './pages/ShelterAdmin/adoption-page';
import Message from './pages/ShelterAdmin/message';

//Super admin pages
import SaDashboard from './pages/SuperAdmin/sadashboard';
import ListOfNGO from './pages/SuperAdmin/listofngo';
import PostOfNGO from './pages/SuperAdmin/postofngo';
import AddNgo from './pages/SuperAdmin/addngo';
import ViewNgo from './pages/SuperAdmin/viewngo';

//
import Testingan from './testingan';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PagenotFound from './PagenotFound';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Shelter Admin */}
          <Route path="/" element={<SignIn />} />
          <Route path="/t" element={<Testingan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/adoptionpage" exact element={<AdopptionPage />} />
          <Route path="/animallisting" exact element={<AnimalListing />} />
          <Route path="/message" exact element={<Message />} />
          {/* Animal Listing */}
          <Route path="/animallisting/addanimal" element={<AddAnimal />} />

          <Route
            path="/animallisting/editanimal/:id"
            element={<EditAnimal />}
          />

          {/* Super Admin */}
          <Route path="/admin/dashboard" element={<SaDashboard />} />
          <Route path="/admin/postofngo" element={<PostOfNGO />} />
          <Route path="/admin/addngo" element={<AddNgo />} />
          <Route path="/admin/listofngo" element={<ListOfNGO />} />
          <Route
            path="/admin/listofngo/viewngo/:id"
            element={<ViewNgo />}
          ></Route>
          <Route exact path="/admin/viewanimal" />

          {/* Page not Found */}
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
