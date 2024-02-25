import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';

const Register = () => {
  return (
    <div className='bg-yellow px-12 p-4 mt-24'>
      <div className='mt-8 flex flex-col max-w-3xl m-auto'>
        <h2 className='md:text-4xl text-2xl text-center font-bold fontPrimary text-primary mb-8'>
          Sign Up
        </h2>
        <div className='text-secondary'>
          <RegisterForm />
        </div>
        <p className='mt-6 text-center text-primary mb-8'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-green hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-bold transition-all duration-300 ease-in-out'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
