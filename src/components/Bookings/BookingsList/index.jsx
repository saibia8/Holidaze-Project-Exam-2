import { useState } from 'react';
import BookingItem from '../BookingItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookingById } from '../../../services/api';

const BookingsList = ({ bookings }) => {
  const [modalName, setModalName] = useState('');
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [bookingsList, setBookingsList] = useState(bookings);
  const queryClient = useQueryClient();

  const deleteBookingMutation = useMutation({
    mutationFn: deleteBookingById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      console.log(data);
    },
  });

  const openModal = (name, bookingId) => {
    setModalName(name);
    setBookingIdToDelete(bookingId);
    document.getElementById('delete_modal').showModal();
  };

  const bookingDeleteHandler = () => {
    deleteBookingMutation.mutate(bookingIdToDelete);
    setBookingsList((prevBookings) => {
      return prevBookings.filter((booking) => booking.id !== bookingIdToDelete);
    });
    document.getElementById('delete_modal').close();
  };

  return (
    <div className='md:container md:mx-auto'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto'>
        {bookingsList.map((booking) => (
          <BookingItem
            key={booking.id}
            bookingId={booking.id}
            dateFrom={booking.dateFrom}
            dateTo={booking.dateTo}
            guests={booking.guests}
            venueId={booking.venue.id}
            media={booking.venue.media}
            name={booking.venue.name}
            location={booking.venue.location}
            rating={booking.venue.rating}
            price={booking.venue.price}
            meta={booking.venue.meta}
            openModal={openModal}
            bookingDelete={bookingDeleteHandler}
          />
        ))}
        <dialog id='delete_modal' className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Cancel {modalName} booking?</h3>
            <p className='py-4'>
              Are you sure want to cancel booking? This will delete your
              booking.{' '}
            </p>
            <div className='flex justify-end'>
              <button
                className='btnPrimary mr-4'
                onClick={() => {
                  document.getElementById('delete_modal').close();
                }}
              >
                CANCEL
              </button>
              <button
                className='btnPrimary bg-[#FFB7A0] hover:outline hover:outline-[#FFB7A0] text-primary'
                onClick={bookingDeleteHandler}
              >
                DELETE
              </button>
            </div>
          </div>
          <form method='dialog' className='modal-backdrop'>
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default BookingsList;
