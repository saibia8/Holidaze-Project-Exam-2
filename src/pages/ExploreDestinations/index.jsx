import { useQuery } from '@tanstack/react-query';
import VenuesList from '../../components/Venues/VenuesList';
import { getVenues } from '../../services/api';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ExploreDestinations = () => {
  const [filteredVenues, setFilteredVenues] = useState([]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  const formik3 = useFormik({
    initialValues: {
      destination: '',
      startDate: '',
      endDate: '',
      guests: 1,
    },
    validationSchema: Yup.object({
      destination: Yup.string().required('Please enter destination.'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .min(Yup.ref('startDate'), 'End date cannot be before start date')
        .required('End date is required'),
      guests: Yup.number()
        .min(1, 'Number of guests cannot be less than 1')
        .required('Please enter number of guests.'),
    }),
    onSubmit: (values) => {
      const searchData = {
        name: values.destination,
        dateFrom: new Date(values.startDate),
        dateTo: new Date(values.endDate),
        maxGuests: values.guests,
      };
      const filtered = data.filter((venue) => {
        const isAvailable = isVenueAvailable(
          venue,
          searchData.dateFrom,
          searchData.dateTo
        );
        const isDestinationMatch = venue.name
          .trim()
          .toLowerCase()
          .includes(searchData.name.trim().toLowerCase());
        const isGuestsMatch = venue.maxGuests === Number(searchData.maxGuests);
        return isAvailable && isDestinationMatch && isGuestsMatch;
      });
      setFilteredVenues(filtered);
    },
  });

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
          <form onSubmit={formik3.handleSubmit}>
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
                  onChange={formik3.handleChange}
                  value={formik3.values.destination}
                  className={`w-full bg-secondary border-2 ${
                    formik3.errors.destination
                      ? 'border-red-500'
                      : 'border-green'
                  } rounded-lg p-2 mt-2 mr-2`}
                />
                {formik3.touched.destination && formik3.errors.destination ? (
                  <div className=' text-red-500'>
                    {formik3.errors.destination}
                  </div>
                ) : null}
              </div>
              <div className='mr-4 mt-8'>
                <label htmlFor='startDate' className='font-bold text-secondary'>
                  Check-In Date
                </label>
                <input
                  type='date'
                  id='startDate'
                  name='startDate'
                  onChange={formik3.handleChange}
                  value={formik3.values.startDate}
                  className={`w-full bg-secondary border-2 ${
                    formik3.errors.startDate ? 'border-red-500' : 'border-green'
                  } rounded-lg p-2 mt-2 mr-2`}
                />
                {formik3.touched.startDate && formik3.errors.startDate ? (
                  <div className=' text-red-500'>
                    {formik3.errors.startDate}
                  </div>
                ) : null}
              </div>
              <div className='mr-4 mt-8'>
                <label htmlFor='endDate' className='font-bold text-secondary'>
                  Check-Out Date
                </label>
                <input
                  type='date'
                  id='endDate'
                  onChange={formik3.handleChange}
                  value={formik3.values.endDate}
                  name='endDate'
                  className={`w-full bg-secondary border-2 ${
                    formik3.errors.endDate ? 'border-red-500' : 'border-green'
                  } rounded-lg p-2 mt-2`}
                />
                {formik3.touched.endDate && formik3.errors.endDate ? (
                  <div className=' text-red-500'>{formik3.errors.endDate}</div>
                ) : null}
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
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                type='submit'
                className='w-1/2 btnSecondary p-2 mt-4 mb-8 bg-orange'
              >
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
