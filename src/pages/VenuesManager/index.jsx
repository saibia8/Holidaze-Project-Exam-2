import { useQuery } from '@tanstack/react-query';
import VenuesList from '../../components/Venues/VenuesList';
import { getVenuesByName } from '../../services/api';

const VenuesManager = () => {
  const {
    isPending,
    isError,
    data: venues,
    error,
  } = useQuery({
    queryKey: ['venues', 'user'],
    queryFn: getVenuesByName,
  });

  if (isPending)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
        <span className='loading loading-infinity loading-lg'></span>
      </div>
    );
  if (isError)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
        {' '}
        `Error: ${error.message}`{' '}
      </div>
    );
  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
      <div className='bg-yellow p-8'>
        <h1 className='fontPrimary font-bold md:text-4xl text-2xl text-center'>
          Venues Manager
        </h1>
        {!venues.length && (
          <p className='text-center font-bold mt-6'>You have no venues.</p>
        )}
        <VenuesList venues={venues} />
      </div>
    </div>
  );
};

export default VenuesManager;
