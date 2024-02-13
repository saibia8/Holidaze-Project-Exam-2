import { useQuery } from '@tanstack/react-query';
import { getVenues } from '../../../services/api';
import VenueItem from '../VenueItem';

const VenuesList = () => {
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
    <div className=''>
      <h2>Venues</h2>
      {venues?.map((venue) => (
        <VenueItem key={venue.id} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesList;
