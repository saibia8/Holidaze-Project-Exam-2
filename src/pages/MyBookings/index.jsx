import { useQuery } from '@tanstack/react-query';
import { getBookingsByName } from '../../services/api';
import BookingsList from '../../components/Bookings/BookingsList';

const MyBookings = () => {
  const {
    isPending,
    isError,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', 'user'],
    queryFn: getBookingsByName,
  });

  if (isPending)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-20 items-center'>
        <span className='loading loading-infinity loading-lg items-center text-center'></span>
      </div>
    );
  if (isError)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-20 items-center'>
        `Error: ${error.message}`
      </div>
    );
  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
      <div className='bg-yellow p-8'>
        <h1 className='fontPrimary font-bold md:text-4xl text-2xl text-center'>
          Upcoming Bookings
        </h1>
        {!bookings.length && (
          <p className='text-center font-bold mt-6'>
            You have no upcoming bookings.
          </p>
        )}
        <BookingsList bookings={bookings} />
      </div>
    </div>
  );
};

export default MyBookings;
