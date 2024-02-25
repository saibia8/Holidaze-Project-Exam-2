import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ExploreDestinations from './pages/ExploreDestinations';
import Profile from './pages/Profile';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import VenuesManager from './pages/VenuesManager';
import LoginRoute from './components/LoginRoute';
import Venue from './pages/Venue';
import ProfileUpdate from './pages/ProfileUpdate';
import VenueManagerRoute from './components/VenueManagerRoute';
import CreateVenue from './pages/CreateVenue';
import EditVenue from './pages/EditVenue';
import UpdateBooking from './pages/UpdateBooking';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path='/explore-destinations'
            element={<ExploreDestinations />}
          />
          <Route path='/venue/:id' element={<Venue />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about' element={<About />} />

          <Route
            path='/register'
            element={
              <LoginRoute>
                <Register />
              </LoginRoute>
            }
          />
          <Route
            path='/login'
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile-update'
            element={
              <PrivateRoute>
                <ProfileUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path='/update-booking/:id'
            element={
              <PrivateRoute>
                <UpdateBooking />
              </PrivateRoute>
            }
          />
          <Route
            path='/venues-manager'
            element={
              <VenueManagerRoute>
                <VenuesManager />
              </VenueManagerRoute>
            }
          />
          <Route
            path='/create-venue'
            element={
              <VenueManagerRoute>
                <CreateVenue />
              </VenueManagerRoute>
            }
          />
          <Route
            path='/venue-edit/:id'
            element={
              <VenueManagerRoute>
                <EditVenue />
              </VenueManagerRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
