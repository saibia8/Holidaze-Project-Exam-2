import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='bg-blue-500 p-6 flex space-x-10 items-center'>
      <div>
        <h1 className='text-white text-2xl font-bold'>
          <Link to='/'>Logo</Link>
        </h1>
      </div>
      <nav>
        <ul className='flex space-x-4'>
          <li>
            <NavLink to='/' className='text-white hover:text-gray-200'>
              Explore Destinations
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact-us'
              className='text-white hover:text-gray-200'
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='text-white hover:text-gray-200'>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='space-x-4'>
        <Link
          to='/register'
          className='bg-white text-blue-500 px-4 py-2 rounded-md'
        >
          Register
        </Link>
        <Link
          to='/login'
          className='bg-white text-blue-500 px-4 py-2 rounded-md'
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Nav;
