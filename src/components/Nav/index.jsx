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

  const navItems = [
    { link: 'Explore Destinations', path: 'explore-destinations' },
    { link: 'Contact Us', path: 'contact-us' },
    { link: 'About', path: 'about' },
  ];

  const logoutHandler = () => {
    setIsUserLoggedIn(false);
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className='bg-secondary md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0'>
        <div className='bg-secondary text-lg container mx-auto flex justify-between items-center font-medium'>
          <div className='flex space-x-14 items-center'>
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
              <Link
                to='profile'
                className='lg:flex items-center hover:text-green'
              >
                <CgProfile className='mr-2' />
                <span>Profile</span>
              </Link>
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
          <Link
            to='profile'
            className='block pt-5 hover:text-green'
            onClick={toggleMenu}
          >
            <CgProfile className='mr-2' />
            <span>Profile</span>
          </Link>
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
