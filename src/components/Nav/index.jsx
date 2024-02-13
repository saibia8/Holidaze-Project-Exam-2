import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='container mx-auto px-6 py-3'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold text-gray-800'>
          Logo
        </Link>

        <div className='flex space-x-4'>
          <NavLink
            to='/explore-destinations'
            className='text-gray-800 hover:text-blue-600'
          >
            Explore Destinations
          </NavLink>

          <NavLink
            to='/contact-us'
            className='text-gray-800 hover:text-blue-600'
          >
            Contact Us
          </NavLink>

          <NavLink to='/about' className='text-gray-800 hover:text-blue-600'>
            About
          </NavLink>
        </div>

        <div className='space-x-4'>
          <Link
            to='/register'
            className='bg-blue-600 text-white px-4 py-2 rounded-md'
          >
            Register
          </Link>
          <Link
            to='/login'
            className='bg-blue-600 text-white px-4 py-2 rounded-md'
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
