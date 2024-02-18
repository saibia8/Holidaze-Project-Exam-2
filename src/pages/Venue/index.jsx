import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getVenueById } from '../../services/api';

const Venue = () => {
  let params = useParams();
  const id = params.id;
  const {
    isPending,
    isError,
    data: venue,
    error,
  } = useQuery({
    queryKey: ['venues', id],
    queryFn: () => getVenueById(id),
  });

  if (isPending)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
        <span>Loading...</span>
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
      <div className='bg-yellow flex'>
        <img src={venue.media[0]} alt={venue.name} className='w-40 h-30' />
        <div className=''>
          <h1>{venue.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Venue;
