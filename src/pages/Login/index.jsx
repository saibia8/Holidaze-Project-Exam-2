import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <div className='bg-yellow px-12 p-4 mt-24'>
      <div className=' mt-8 flex flex-col max-w-3xl m-auto'>
        <h2 className='md:text-4xl text-2xl font-bold fontPrimary text-center text-primary mb-8'>
          Login
        </h2>
        <div className='text-secondary'>
          <LoginForm />
        </div>
        <p className='mt-6 text-center text-primary mb-8'>
          Not a member?{' '}
          <Link
            to='/register'
            className='text-green hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-bold transition-all duration-300 ease-in-out'
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
