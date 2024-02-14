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

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/profile' element={<Profile />} />
            <Route index element={<Home />} />
            <Route
              path='/explore-destinations'
              element={<ExploreDestinations />}
            />
            <Route path='/register' element={<Register />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
