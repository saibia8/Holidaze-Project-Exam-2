import logo from '../../assets/logo.svg';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/Instagram.png';
import twitter from '../../assets/twitter.png';
import linkedin from '../../assets/linkedin.png';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <div className='bg-secondary md:px-14 p-4 max-w-screen-2xl mx-auto text-primary border-t'>
      <div className='my-12 flex flex-col md:flex-row gap-10'>
        <div className='md:w-1/2 space-y-8'>
          <a
            href='/'
            className='text-2xl font-semibold flex items-center space-x-3 text-primary'
          >
            <img src={logo} alt='' className='w10 inline-block items-center' />
            <span className='text-white'>XYZ</span>
          </a>
          <p className='md:w-1/2'>
            Subscribe to our newsletter and never miss our new articles, product
            updates, and special deals.
          </p>
          <div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Your email'
              className='bg-yellow py-2 px-4 rounded-md focus:outline-none'
            />
            <input
              type='submit'
              value='Subscribe'
              className='btnSecondary bg-orange -ml-2'
            />
          </div>
        </div>

        {/* footer navigation */}
        <div className='md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start'>
          <div className='space-y-4 mt-5'>
            <h4 className='text-xl'>Navigate</h4>
            <ul className='space-y-3'>
              <Link
                to='explore-destinations'
                className='block hover:text-gray-300 cursor-pointer'
              >
                Explore Destinations
              </Link>
              <Link
                to='contact-us'
                className='block hover:text-gray-300 cursor-pointer'
              >
                Contact Us
              </Link>
              <Link
                to='about'
                className='block hover:text-gray-300 cursor-pointer'
              >
                About
              </Link>
            </ul>
          </div>
          <div className='space-y-4 mt-5'>
            <h4 className='text-xl'>Help</h4>
            <ul className='space-y-3'>
              <Link href='/' className='block hover:text-gray-300'>
                How does it works?
              </Link>
              <Link href='/' className='block hover:text-gray-300'>
                Where to ask question?
              </Link>
              <Link href='/' className='block hover:text-gray-300'>
                How to pay?
              </Link>
              <Link href='/' className='block hover:text-gray-300'>
                What is needed for this?
              </Link>
            </ul>
          </div>
          <div className='space-y-4 mt-5'>
            <h4 className='text-xl'>Contacts</h4>
            <ul className='space-y-3'>
              <p className='font-semibold'>123 Maple Street</p>
              <p>Springfield, Anytown 12345</p>
              <p>
                <span className='font-semibold'>Phone: </span>+1 (555) 123-4567
              </p>
              <p>
                <span className='font-semibold'>Email: </span>hello@holidaze.com
              </p>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8'>
        <p className='py-5'>&copy; 2024 All rights reserved. Holidaze</p>
        <div className='flex items-center space-x-5'>
          <img
            src={facebook}
            alt=''
            className='w-8 cursor-pointer hover:-translate-y-3 transition-all duration-300'
          />
          <img
            src={instagram}
            alt=''
            className='w-8 cursor-pointer hover:-translate-y-3 transition-all duration-300'
          />
          <img
            src={twitter}
            alt=''
            className='w-8 cursor-pointer hover:-translate-y-3 transition-all duration-300'
          />
          <img
            src={linkedin}
            alt=''
            className='w-8 cursor-pointer hover:-translate-y-3 transition-all duration-300'
          />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
