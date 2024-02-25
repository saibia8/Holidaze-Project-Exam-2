import { useQuery } from '@tanstack/react-query';
import VenuesList from '../../components/Venues/VenuesList';
import { getVenues } from '../../services/api';
import { useEffect, useState } from 'react';

const ExploreDestinations = () => {
  const [filteredVenues, setFilteredVenues] = useState([]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  useEffect(() => {
    console.log('Filtered venues:', filteredVenues);
  }, [filteredVenues]);

  if (isPending) return <span>Loading...</span>;
  if (isError) return `Error: ${error.message}`;

  function isVenueAvailable(venue, startDate, endDate) {
    const desiredStartDate = new Date(startDate);
    const desiredEndDate = new Date(endDate);

    return !venue.bookings.some((booking) => {
      const bookingStartDate = new Date(booking.dateFrom);
      const bookingEndDate = new Date(booking.dateTo);

      return (
        (desiredStartDate >= bookingStartDate &&
          desiredStartDate <= bookingEndDate) ||
        (desiredEndDate >= bookingStartDate &&
          desiredEndDate <= bookingEndDate) ||
        (desiredStartDate <= bookingStartDate &&
          desiredEndDate >= bookingEndDate)
      );
    });
  }

  const searchHandler = (e) => {
    e.preventDefault();
    const destination = e.target.destination.value;
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const guests = e.target.guests.value;

    console.log(destination, startDate, endDate, guests);
    const filtered = data.filter((venue) => {
      console.log(venue.name, venue.maxGuests);
      const isAvailable = isVenueAvailable(venue, startDate, endDate);
      const isDestinationMatch = venue.name
        .trim()
        .toLowerCase()
        .includes(destination.trim().toLowerCase());
      const isGuestsMatch = venue.maxGuests === Number(guests);
      console.log(
        `Checking venue in ${venue.name} for ${venue.maxGuests} guests:`,
        `Availability: ${isAvailable ? 'Yes' : 'No'}`,
        `Destination match: ${isDestinationMatch ? 'Yes' : 'No'}`,
        `Guests match: ${isGuestsMatch ? 'Yes' : 'No'}`
      );
      return isAvailable && isDestinationMatch && isGuestsMatch;
    });
    setFilteredVenues(filtered);
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
            <div className='flex justify-center mt-4'>
              <button className='w-1/2 btnSecondary p-2 mt-4 mb-8'>
                SEARCH
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <VenuesList venues={filteredVenues.length ? filteredVenues : data} />
      </div>
    </div>
  );
};

export default ExploreDestinations;
