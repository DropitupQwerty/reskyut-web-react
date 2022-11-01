import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

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

import PagenotFound from './PagenotFound';
import IsLoggedIn from './firebase/auth';
import { auth } from './firebase/firebase-config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import ViewAnimal from './pages/SuperAdmin/viewanimal';
import SaProfile from './pages/SuperAdmin/saprofile';
import AdminTrash from './pages/SuperAdmin/adminTrash';
import NgoTrash from './pages/ShelterAdmin/ngoTrash';
import { ToastContainer } from 'react-toastify';
import AdminNgoTrash from './pages/SuperAdmin/adminNgoTrash';
import AdoptionHistory from './pages/ShelterAdmin/adoptionHistory';
import ForgotPassword from './forgotPassword';

export default function App() {
  const user = IsLoggedIn();

  function Path() {
    if (user?.loggedIn) {
      if (user?.userData.isAdmin) {
        return (
          <Route>
            <Route path="/admin/dashboard" element={<SaDashboard />} />
            <Route path="/admin/postofngo" element={<PostOfNGO />} />
            <Route path="/admin/addngo" element={<AddNgo />} />
            <Route path="/admin/listofngo" element={<ListOfNGO />} />
            <Route path="/admin/listofngo/viewngo/:id" element={<ViewNgo />} />
            <Route path="/admin/profile" element={<SaProfile />} />
            <Route path="/admin/trash" element={<AdminTrash />} />
            <Route path="/admin/ngotrash" element={<AdminNgoTrash />} />
            <Route
              path="/admin/postofngo/viewanimal/:id"
              element={<ViewAnimal />}
            />
          </Route>
        );
      } else if (!user?.isAdmin) {
        return (
          <Route>
            {/* Shelter Admin */}
            <Route path="/trash" element={<NgoTrash />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/adoptionpage" exact element={<AdopptionPage />} />
            <Route
              path="/adoptionhistory"
              exact
              element={<AdoptionHistory />}
            />
            <Route path="/animallisting" exact element={<AnimalListing />} />
            <Route path="/message/:id/:rid" element={<Message />} />
            {/* Animal Listing */}
            <Route path="/animallisting/addanimal" element={<AddAnimal />} />
            <Route
              path="/animallisting/editanimal/:id"
              element={<EditAnimal />}
            />
          </Route>
        );
      }
    } else {
      return <Route path="*" element={<Navigate to="/" replace={true} />} />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/*  */}
          {/* Super Admin */}
          {Path()}
          <Route index element={<SignIn />} />;
          <Route path="/forgotpassword" element={<ForgotPassword />} />;
          <Route
            path="*"
            element={<Navigate to="/Page-Not-Found" replace={true} />}
          />
          <Route path="/Page-Not-Found" element={<PagenotFound />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}
