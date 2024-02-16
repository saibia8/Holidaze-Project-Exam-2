import hoteltravel from '../../assets/Hotel-travel.png';
import SearchForm from '../../components/SearchForm';

const Home = () => {
  return (
    <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-24 bg-yellow'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-8  '>
        {/* about image */}
        <div className='md:w-1/2'>
          <img src={hoteltravel} alt='' />
        </div>

        {/* about content */}
        <div className='md:w-2/5'>
          <h2 className='md:text-5xl text-3xl font-bold text-primary fontPrimary mb-5 leading-normal'>
            Discover Your Dream Destinations with Holidaze
          </h2>
          <p className='text-tartiary text-lg mb-7'>
            Plan your perfect getaway and book accommodations hassle-free.
          </p>
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
