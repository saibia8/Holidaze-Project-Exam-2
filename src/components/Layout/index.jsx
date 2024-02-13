import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Header />
      <Outlet className='flex-grow' />
      <Footer />
    </div>
  );
};

export default Layout;
