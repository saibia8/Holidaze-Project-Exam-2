import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getBookingById,
  getVenueById,
  updateBooking,
} from '../../services/api';
import star from '../../assets/Star.png';
import breakfastImg from '../../assets/cafe.png';
import wifiImg from '../../assets/wiFi.png';
import parkingImg from '../../assets/parking.png';
import petsImg from '../../assets/footprint.png';
import { useBearStore } from '../../state/state';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import noImage from '../../assets/No-image-icon.png';
import CalendarPicker from '../../components/CalendarPicker';

const UpdateBooking = () => {
  const [nights, setNights] = useState(1);
  const queryClient = useQueryClient();
  let params = useParams();
  const id = params.id;
  const query = new URLSearchParams(useLocation().search);
  const venueId = query.get('venueId');

  const {
    isPending,
    isError,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
  });

  const {
    isPendingVenue,
    isErrorVenue,
    data: venue,
    errorVenue,
  } = useQuery({
    queryKey: ['venues', venueId],
    queryFn: () => getVenueById(venueId),
  });

  const updateBookingMutation = useMutation({
    mutationFn: ({ id, data }) => updateBooking(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
  });

  const formik3 = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: new Date(),
      guests: 1,
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .min(Yup.ref('startDate'), 'End date cannot be before start date')
        .required('End date is required'),
      guests: Yup.number()
        .min(1, 'Number of guests cannot be less than 1')
        .required('Please enter number of guests.'),
    }),
    onSubmit: (values) => {
      const data = {
        dateFrom: values.startDate,
        dateTo: values.endDate,
        guests: values.guests,
      };
      updateBookingMutation.mutate({ id, data });
    },
  });

  useEffect(() => {
    if (formik3.values.startDate && formik3.values.endDate) {
      const date1 = new Date(formik3.values.startDate);
      const date2 = new Date(formik3.values.endDate);
      const diffTime = Math.abs(date2 - date1);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(days);
    }
  }, [formik3.values.startDate, formik3.values.endDate]);

  if (isPending || isPendingVenue)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
        <span className='loading loading-infinity loading-lg'></span>
      </div>
    );
  if (isError || isErrorVenue)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
        {' '}
        `Error: ${error.message} ${errorVenue.message}`{' '}
      </div>
    );

  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
      <div className='bg-yellow flex md:flex-row flex-col justify-between'>
        <div className='m-10 flex flex-col md:flex-row'>
          <img
            src={booking.venue.media[0] ? booking.venue.media[0] : noImage}
            alt={booking.venue.name}
            className='h-70 w-60 object-cover rounded-2xl'
          />
          <div className='ml-5'>
            <h1 className='font-bold text-xl mb-5'>{booking.venue.name}</h1>
            <p>{booking.venue.location.address}</p>
            <p>
              {booking.venue.location.city}, {booking.venue.location.country}
            </p>
            <p className='mt-10 text-primary text-xl font-bold'>
              ${booking.venue.price}/night
            </p>
            <div className='mt-10 flex flex-row'>
              <p className='flex flex-row items-center'>
                <img src={star} alt='' className='w-5 h-5 mr-1' />{' '}
                <span className='font-bold text-lg'>
                  {booking.venue.rating}
                </span>
              </p>
            </div>
            <h1 className='mt-10 text-lg font-semibold'>Ameneties</h1>
            <div className='flex flex-row justify-between'>
              <ul className='mt-2 flex flex-row'>
                <li className='flex gap-3 items-center'>
                  <img
                    src={breakfastImg}
                    alt=''
                    className={`w-7 h-7 ${
                      booking.venue.meta.breakfast ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
                <li className='flex gap-3 items-center'>
                  <img
                    src={parkingImg}
                    alt=''
                    className={`w-7 h-7 ${
                      booking.venue.meta.parking ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
                <li className='flex gap-3 items-center'>
                  <img
                    src={petsImg}
                    alt=''
                    className={`w-7 h-7 ${
                      booking.venue.meta.pets ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
                <li className='flex gap-3 items-center'>
                  <img
                    src={wifiImg}
                    alt=''
                    className={`w-7 h-7 ${
                      booking.venue.meta.wifi ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='m-10 flex flex-col md:flex-row'>
          <div className='border-2 border-green md:px-6 px-4 rounded-lg shadow-3xl h-fit'>
            <div>
              <div>
                <p className='text-primary text-xl font-bold pt-4'>
                  ${booking.venue.price}/night
                </p>
                <form action='submit' onSubmit={formik3.handleSubmit}>
                  <div className='mr-4 mt-8 flex flex-col items-center'>
                    <label
                      htmlFor='startDate'
                      className='font-bold text-center mb-3'
                    >
                      Select Dates
                    </label>
                    <CalendarPicker
                      id='startDate'
                      name='startDate'
                      startDate={formik3.values.startDate}
                      endDate={formik3.values.endDate}
                      formik={formik3}
                      bookings={venue.bookings}
                      onChange={({ startDate, endDate }) => {
                        formik3.setFieldValue('startDate', startDate);
                        formik3.setFieldValue('endDate', endDate);
                      }}
                    />
                    {formik3.touched.startDate && formik3.errors.startDate ? (
                      <div className=' text-red-500'>
                        {formik3.errors.startDate}
                      </div>
                    ) : null}
                    {formik3.touched.endDate && formik3.errors.endDate ? (
                      <div className=' text-red-500'>
                        {formik3.errors.endDate}
                      </div>
                    ) : null}
                  </div>

                  <div className='mr-4 mt-4 pb-5 flex flex-col'>
                    <label htmlFor='guests' className='font-bold'>
                      Guests
                    </label>
                    <input
                      type='number'
                      min={1}
                      id='guests'
                      name='guests'
                      onChange={formik3.handleChange}
                      value={formik3.values.guests}
                      className={`w-1/2 bg-secondary border-2 ${
                        formik3.errors.guests
                          ? 'border-red-500'
                          : 'border-green'
                      } rounded-lg p-2 mt-2 mr-2`}
                    />
                    {formik3.touched.guests && formik3.errors.guests ? (
                      <div className=' text-red-500'>
                        {formik3.errors.guests}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex md:flex-row flex-col justify-between'>
                    <div className='mr-4 mt-6'>
                      <h3 className='font-bold text-lg'>{`$${
                        booking.venue.price
                      } x ${nights} night${nights !== 1 ? 's' : ''}`}</h3>
                    </div>
                    <div className='mr-4 mt-8'>
                      <h3 className='font-bold text-lg'>
                        ${booking.venue.price * nights}
                      </h3>
                    </div>
                  </div>
                  <div className='flex md:flex-row flex-col justify-between mb-2'>
                    <div className='mr-4 mt-2'>
                      <h3 className='font-bold text-lg'>
                        Holidaze Service fee
                      </h3>
                    </div>
                    <div className='mr-4 mt-2'>
                      <h3 className='font-bold text-lg'>$80</h3>
                    </div>
                  </div>
                  <div className='border-[1px] border-green' />
                  <div className='flex md:flex-row flex-col justify-between mb-4'>
                    <div className='mr-4 mt-2'>
                      <h3 className='font-bold text-lg'>Total</h3>
                    </div>
                    <div className='mr-4 mt-2'>
                      <h3 className='font-bold text-lg'>
                        ${booking.venue.price * nights + 80}
                      </h3>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='w-full btnPrimary p-2 mt-4 mb-8 bg-green'
                  >
                    Update Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='m-10 flex flex-col justify-between'>
          <div className='flex flex-col items-start gap-5'>
            <div>
              <h1 className='font-bold mb-1'>Booking in date:</h1>
              <h1>{booking.dateFrom.split('T')[0]}</h1>
            </div>
            <div>
              <h1 className='font-bold mb-1'>Booking out date:</h1>
              <h1>{booking.dateTo.split('T')[0]}</h1>
            </div>
            <div>
              <h1 className='font-bold mb-1'>Created booking date:</h1>
              <h1>{booking.created.split('T')[0]}</h1>
            </div>
            <div>
              <h1 className='font-bold mb-1'>Updated booking date:</h1>
              <h1>{booking.updated.split('T')[0]}</h1>
            </div>
            <div>
              <h1 className='mb-1'>
                <span className='font-bold'>Guests:</span> {booking.guests}
              </h1>
            </div>
          </div>
          <div className='mt-10'>
            <p>Created Venue {booking.venue.created.split('T')[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;
