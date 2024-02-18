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
          <Route path='*' element={<NotFound />} />
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
            path='/venues-manager'
            element={
              <PrivateRoute>
                <VenuesManager />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
