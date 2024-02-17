import { useQuery } from '@tanstack/react-query';
import VenuesList from '../../components/Venues/VenuesList';
import { getVenues } from '../../services/api';

const ExploreDestinations = () => {
  const {
    isPending,
    isError,
    data: venues,
    error,
  } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return `Error: ${error.message}`;

  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
      <h1 className='text-2xl text-center'>Explore Destinations</h1>
      <VenuesList venues={venues} />
    </div>
  );
};

export default ExploreDestinations;
