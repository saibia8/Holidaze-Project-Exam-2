import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getVenueById, reserveBooking } from '../../services/api';
import star from '../../assets/Star.png';
import breakfastImg from '../../assets/cafe.png';
import wifiImg from '../../assets/wiFi.png';
import parkingImg from '../../assets/parking.png';
import petsImg from '../../assets/footprint.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useBearStore } from '../../state/state';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import noImage from '../../assets/No-image-icon.png';
import CalendarPicker from '../../components/CalendarPicker';

const Venue = () => {
  const [nights, setNights] = useState(1);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const name = useBearStore((state) => state.userInfo?.name);
  const isUserLoggedIn = useBearStore((state) => state.isUserLoggedIn);
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

  const reserveBookingMutation = useMutation({
    mutationFn: reserveBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user'] });
      if (data.id) {
        navigate('/my-bookings');
      }
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
        venueId: id,
        dateFrom: values.startDate,
        dateTo: values.endDate,
        guests: values.guests,
      };
      reserveBookingMutation.mutate(data);
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
      <div className='bg-yellow flex md:flex-row flex-col justify-between'>
        <div className='m-10 flex flex-col md:flex-row'>
          <img
            src={venue.media[0] ? venue.media[0] : noImage}
            alt={venue.name}
            className='h-70 w-60 object-cover rounded-2xl'
          />
          <div className='ml-5'>
            <h1 className='font-bold text-xl mb-5'>{venue.name}</h1>
            <p>{venue.location.address}</p>
            <p>
              {venue.location.city}, {venue.location.country}
            </p>
            <p className='mt-10 text-primary text-xl font-bold'>
              ${venue.price}/night
            </p>
            <div className='mt-10 flex flex-row'>
              <p className='flex flex-row items-center'>
                <img src={star} alt='' className='w-5 h-5 mr-1' />{' '}
                <span className='font-bold text-lg'>{venue.rating}</span>
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
                      venue.meta.breakfast ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
                <li className='flex gap-3 items-center'>
                  <img
                    src={parkingImg}
                    alt=''
                    className={`w-7 h-7 ${
                      venue.meta.parking ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
                <li className='flex gap-3 items-center'>
                  <img
                    src={petsImg}
                    alt=''
                    className={`w-7 h-7 ${
                      venue.meta.pets ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
                <li className='flex gap-3 items-center'>
                  <img
                    src={wifiImg}
                    alt=''
                    className={`w-7 h-7 ${
                      venue.meta.wifi ? '' : 'opacity-50 grayscale'
                    }`}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='m-10 flex flex-col justify-between'>
          <div className='flex items-center gap-2'>
            <img
              src={venue.owner.avatar}
              alt=''
              className=' rounded-xl w-20 h-25 object-cover'
            />
            <div>
              <h1 className='text-lg font-semibold'>Host</h1>
              <h2 className='text-lg font-semibold'>{venue.owner.name}</h2>
            </div>
          </div>

          <div>
            <p>Created {venue.created}</p>
          </div>
        </div>
      </div>
      <div className='mt-10 flex md:flex-row flex-col gap-10'>
        <div className='flex flex-col md:w-1/2 w-full'>
          <div className='mb-5'>
            <h1 className='text-2xl font-bold fontPrimary'>Description</h1>
            <p className='mt-4'>{venue.description}</p>
          </div>
          <div>
            <h1 className='text-2xl font-bold fontPrimary'>Location</h1>
            <div className='mt-4'>
              <MapContainer
                center={[venue.location.lat, venue.location.lng]}
                zoom={13}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[venue.location.lat, venue.location.lng]}>
                  <Popup>
                    {venue.location.address.toUpperCase()},<br />{' '}
                    {venue.location.city}, {venue.location.country}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
        <div className='border-2 border-green md:px-6 px-4 rounded-lg shadow-3xl'>
          <div>
            <p className='text-primary text-xl font-bold pt-4'>
              ${venue.price}/night
            </p>
            <form action='submit' onSubmit={formik3.handleSubmit}>
              <div className='mr-4 mt-8 flex  justify-items-center'>
                <label
                  htmlFor='startDate'
                  className='font-bold text-center mb-3 mr-7'
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
                  <div className=' text-red-500'>{formik3.errors.endDate}</div>
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
                    formik3.errors.guests ? 'border-red-500' : 'border-green'
                  } rounded-lg p-2 mt-2 mr-2`}
                />
                {formik3.touched.guests && formik3.errors.guests ? (
                  <div className=' text-red-500'>{formik3.errors.guests}</div>
                ) : null}
              </div>
              <div className='flex md:flex-row flex-col justify-between'>
                <div className='mr-4 mt-6'>
                  <h3 className='font-bold text-lg'>{`$${
                    venue.price
                  } x ${nights} night${nights !== 1 ? 's' : ''}`}</h3>
                </div>
                <div className='mr-4 mt-8'>
                  <h3 className='font-bold text-lg'>${venue.price * nights}</h3>
                </div>
              </div>
              <div className='flex md:flex-row flex-col justify-between mb-2'>
                <div className='mr-4 mt-2'>
                  <h3 className='font-bold text-lg'>Holidaze Service fee</h3>
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
                    ${venue.price * nights + 80}
                  </h3>
                </div>
              </div>
              {isUserLoggedIn && name === venue.owner.name && (
                <div className='flex pb-10 pt-5 justify-center'>
                  <Link to={`/venue-edit/${id}/`} className='btnSecondary'>
                    Edit Your Venue
                  </Link>
                </div>
              )}
              {isUserLoggedIn && name !== venue.owner.name && (
                <button
                  type='submit'
                  className='w-full btnPrimary p-2 mt-4 mb-8 bg-green'
                >
                  Reserve
                </button>
              )}
              {!isUserLoggedIn && (
                <div className='flex pb-10 pt-5 justify-center'>
                  <Link to={`/login`} className='btnPrimary'>
                    Login to Reserve
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
