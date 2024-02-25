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

  const searchHandler = (e) => {
    e.preventDefault();
    const destination = e.target.destination.value;
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const guests = e.target.guests.value;

    console.log(destination, startDate, endDate, guests);
  };

  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-20'>
      <div className='bg-yellow md:flex md:flex-col'>
        <h2 className='md:text-4xl text-2xl font-bold fontPrimary text-primary mb-2 pt-8 text-center'>
          Find Your Destination
        </h2>
        <h3 className='text-center mb-8'>
          Explore a wide variety of venues for your next event or getaway.
        </h3>
        <div className='bg-green md:px-6 px-4 rounded-lg shadow-3xl h-fit w-3/4 mx-auto mb-10'>
          <form onSubmit={searchHandler}>
            <div className='flex md:flex-row flex-col'>
              <div className='mr-4 mt-8'>
                <label
                  htmlFor='destination'
                  className='font-bold text-secondary'
                >
                  Destination
                </label>
                <input
                  type='text'
                  id='destination'
                  name='destination'
                  className='w-full bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
                />
              </div>
              <div className='mr-4 mt-8'>
                <label htmlFor='startDate' className='font-bold text-secondary'>
                  Check-In Date
                </label>
                <input
                  type='date'
                  id='startDate'
                  name='startDate'
                  className='w-full bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
                />
              </div>
              <div className='mr-4 mt-8'>
                <label htmlFor='endDate' className='font-bold text-secondary'>
                  Check-Out Date
                </label>
                <input
                  type='date'
                  id='endDate'
                  name='endDate'
                  className='w-full bg-secondary border-2 border-green rounded-lg p-2 mt-2'
                />
              </div>
              <div className='flex md:flex-row flex-col'>
                <div>
                  <div className='mr-4 mt-8 flex flex-col'>
                    <label
                      htmlFor='guests'
                      className='font-bold text-secondary'
                    >
                      Guests
                    </label>
                    <input
                      type='number'
                      min={1}
                      id='guests'
                      name='guests'
                      className='w-1/2 bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className='w-full btnSecondary p-2 mt-4 mb-8 mx-auto'>
              SEARCH
            </button>
          </form>
        </div>
      </div>
      <div>
        <VenuesList venues={venues} />
      </div>
    </div>
  );
};

export default ExploreDestinations;
