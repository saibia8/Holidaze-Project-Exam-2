import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { useBearStore } from '../../state/state';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserLoggedIn = useBearStore((state) => state.isUserLoggedIn);
  const setIsUserLoggedIn = useBearStore((state) => state.setIsUserLoggedIn);
  const setToken = useBearStore((state) => state.setToken);
  const setUserInfo = useBearStore((state) => state.setUserInfo);

  const navItems = [
    { link: 'Explore Destinations', path: 'explore-destinations' },
    { link: 'Contact Us', path: 'contact-us' },
    { link: 'About', path: 'about' },
  ];

  const logoutHandler = () => {
    setIsUserLoggedIn(false);
    setToken(null);
    setUserInfo(null);
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className='bg-secondary md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0'>
        <div className='bg-secondary text-lg container mx-auto flex justify-between items-center font-medium'>
          <div className='flex space-x-8 items-center'>
            {/* logo */}
            <Link to='/'>
              <img
                src={logo}
                alt=''
                className='w10 inline-block items-center'
              />
            </Link>

            {/* showing navItems using map */}
            <ul className='md:flex space-x-12 hidden'>
              {navItems.map(({ path, link }) => (
                <NavLink
                  key={link}
                  to={path}
                  className='block hover:text-gray-300'
                >
                  {link}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* profile, sign up and login buttons  */}
          <div className='space-x-12 hidden md:flex items-center'>
            {isUserLoggedIn && (
              <details className='dropdown'>
                <summary className='m-1 btn border-1 border-green'>
                  <CgProfile className='mr-2 w-6 h-6' color='#1F5152' />
                  <span className='text-green'>Profile</span>
                </summary>

                <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 border-[1px] border-green'>
                  <li>
                    <Link to='profile'>My Account</Link>
                  </li>
                  <li>
                    <Link to='my-bookings'>Upcoming Bookings</Link>
                  </li>
                  <li>
                    <Link to='/venues-manager'>Manage Venues</Link>
                  </li>
                </ul>
              </details>
            )}
            {isUserLoggedIn && (
              <button className='btnPrimary' onClick={logoutHandler}>
                Log Out
              </button>
            )}
            {!isUserLoggedIn && (
              <Link to='register'>
                <button className='bg-secondary py-2 px-4 transition-all duration-300 rounded outline outline-green hover:text-secondary hover:bg-green'>
                  Sign Up
                </button>
              </Link>
            )}
            {!isUserLoggedIn && (
              <Link to='login'>
                <button className='btnPrimary'>Login</button>
              </Link>
            )}
          </div>

          {/* mobile menu */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-sedondary focus:outline-none focus:text-gray-300'
            >
              {isMenuOpen ? (
                <FaXmark className='w-6 h-6 text-green' />
              ) : (
                <FaBars className='w-6 h-6 text-green' />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* navItems for mobile devices */}
      <div
        className={`space-y-4 px-4 pt-24 pb-5 bg-secondary text-xl md:hidden ${
          isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'
        }`}
      >
        {navItems.map(({ path, link }) => (
          <NavLink
            key={link}
            to={path}
            className='block hover:text-gray-300'
            onClick={toggleMenu}
          >
            {link}
          </NavLink>
        ))}
        {isUserLoggedIn && (
          <details className='dropdown'>
            <summary className='m-1 btn border-1 border-green'>
              <CgProfile className='mr-2' color='#1F5152' />
              <span className='text-green'>Profile</span>
            </summary>

            <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 border-[1px] border-green'>
              <li>
                <Link to='profile' onClick={toggleMenu}>
                  My Account
                </Link>
              </li>
              <li>
                <Link to='my-bookings' onClick={toggleMenu}>
                  Upcoming Bookings
                </Link>
              </li>
              <li>
                <Link to='/venues-manager' onClick={toggleMenu}>
                  Manage Venues
                </Link>
              </li>
            </ul>
          </details>
        )}
        {isUserLoggedIn && (
          <button className='btnPrimary' onClick={logoutHandler}>
            Log Out
          </button>
        )}
        {!isUserLoggedIn && (
          <Link to='register' className='block' onClick={toggleMenu}>
            <button className='bg-secondary py-2 px-4 transition-all duration-300 rounded outline outline-2 outline-green hover:text-secondary hover:bg-green'>
              Sign Up
            </button>
          </Link>
        )}
        {!isUserLoggedIn && (
          <Link to='login' className='block' onClick={toggleMenu}>
            <button className='btnPrimary'>Login</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Nav;
