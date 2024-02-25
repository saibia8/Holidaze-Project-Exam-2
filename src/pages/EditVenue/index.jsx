import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { deleteVenueById, getVenueById, updateVenue } from '../../services/api';

const EditVenue = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const {
    isPending,
    isError,
    data: venueById,
    error,
  } = useQuery({
    queryKey: ['venues', id],
    queryFn: () => getVenueById(id),
  });

  const editVenueMutation = useMutation({
    mutationFn: ({ id, data }) => updateVenue(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['venues', 'user'] });
    },
  });

  const deleteVenueMutation = useMutation({
    mutationFn: deleteVenueById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['venues', 'user'] });
    },
  });

  const formik5 = useFormik({
    initialValues: {
      name: venueById?.name || '',
      description: venueById?.description || '',
      media1: venueById?.media[0] || '',
      media2: venueById?.media[1] || '',
      media3: venueById?.media[2] || '',
      media4: venueById?.media[3] || '',
      media5: venueById?.media[4] || '',
      price: venueById?.price || 0,
      maxGuests: venueById?.maxGuests || 1,
      rating: venueById?.rating || 0,
      wifi: venueById?.meta.wifi || false,
      parking: venueById?.meta.parking || false,
      breakfast: venueById?.meta.breakfast || false,
      pets: venueById?.meta.pets || false,
      address: venueById?.location.address || '',
      city: venueById?.location.city || '',
      zip: venueById?.location.zip || '',
      country: venueById?.location.country || '',
      latitude: venueById?.location.lat || 0,
      longitude: venueById?.location.lng || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      media1: Yup.string().url('Invalid URL'),
      media2: Yup.string().url('Invalid URL'),
      media3: Yup.string().url('Invalid URL'),
      media4: Yup.string().url('Invalid URL'),
      media5: Yup.string().url('Invalid URL'),
      price: Yup.number('Please enter a number')
        .min(0, 'Please enter min 0')
        .required('Required'),
      maxGuests: Yup.number().min(1, 'Please enter min 1').required('Required'),
      rating: Yup.number()
        .min(0, 'Please enter min 0')
        .max(5, 'Please enter max 5'),
      wifi: Yup.boolean(),
      parking: Yup.boolean(),
      breakfast: Yup.boolean(),
      pets: Yup.boolean(),
      address: Yup.string(),
      city: Yup.string(),
      zip: Yup.string(),
      country: Yup.string(),
      latitude: Yup.number(),
      longitude: Yup.number(),
    }),
    onSubmit: (values) => {
      let mediaData = [];
      for (let i = 1; i <= 5; i++) {
        if (values[`media${i}`]) {
          mediaData.push(values[`media${i}`]);
        }
      }
      const venue = {
        name: values.name,
        description: values.description,
        media: mediaData,
        price: values.price,
        maxGuests: values.maxGuests,
        rating: values.rating,
        meta: {
          wifi: values.wifi,
          parking: values.parking,
          breakfast: values.breakfast,
          pets: values.pets,
        },
        location: {
          address: values.address,
          city: values.city,
          zip: values.zip,
          country: values.country,
          lat: values.latitude,
          lng: values.longitude,
        },
      };
      editVenueMutation.mutate({ id, data: venue });
    },
  });

  const deleteVenueHandler = () => {
    deleteVenueMutation.mutate(id);
    navigate('/venues-manager');
  };

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
    <div className='md:bg-secondary px-12 p-4 max-w-3xl m-auto mt-24'>
      <div className='bg-yellow p-10'>
        <h1 className='text-center fontPrimary font-bold md:text-4xl text-3xl mb-8'>
          Update Your Venue
        </h1>
        <div>
          <form onSubmit={formik5.handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='name' className=' font-bold'>
                Name<span className=' text-xl text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter venue name'
                onChange={formik5.handleChange}
                value={formik5.values.name}
                className={`bg-secondary border-2 ${
                  formik5.errors.name ? 'border-red-500' : 'border-green'
                } rounded-lg p-2 mt-2 mr-2`}
              />
              {formik5.touched.name && formik5.errors.name ? (
                <div className=' text-red-500'>{formik5.errors.name}</div>
              ) : null}
            </div>
            <div className='flex flex-col mt-5'>
              <label htmlFor='description' className=' font-bold'>
                Description<span className=' text-xl text-red-500'>*</span>
              </label>
              <textarea
                id='description'
                name='description'
                onChange={formik5.handleChange}
                value={formik5.values.description}
                rows={4}
                cols={50}
                placeholder='Enter venue description'
                className={`bg-secondary border-2 ${
                  formik5.errors.name ? 'border-red-500' : 'border-green'
                } rounded-lg p-2 mt-2 mr-2`}
              />
              {formik5.touched.description && formik5.errors.description ? (
                <div className=' text-red-500'>
                  {formik5.errors.description}
                </div>
              ) : null}
            </div>
            <div className='flex md:flex-row flex-col md:gap-4'>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='price' className=' font-bold'>
                  Price per Night
                  <span className=' text-xl text-red-500'>*</span>
                </label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  onChange={formik5.handleChange}
                  value={formik5.values.price}
                  min={0}
                  placeholder='Enter venue price per night'
                  className={`bg-secondary border-2 ${
                    formik5.errors.price ? 'border-red-500' : 'border-green'
                  } rounded-lg p-2 mt-2 mr-2`}
                />
                {formik5.touched.price && formik5.errors.price ? (
                  <div className=' text-red-500'>{formik5.errors.price}</div>
                ) : null}
              </div>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='maxGuests' className=' font-bold'>
                  Max Guest Capacity
                  <span className=' text-xl text-red-500'>*</span>
                </label>
                <input
                  type='number'
                  id='maxGuests'
                  name='maxGuests'
                  onChange={formik5.handleChange}
                  value={formik5.values.maxGuests}
                  min={1}
                  max={100}
                  placeholder='Enter venue maximum guests'
                  className='bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
            </div>

            <div className='flex flex-col mt-5'>
              <label htmlFor='rating' className=' font-bold'>
                Rating
              </label>
              <input
                type='number'
                id='rating'
                name='rating'
                onChange={formik5.handleChange}
                value={formik5.values.rating}
                min={0}
                max={5}
                placeholder='Enter venue rating'
                className=' bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
              />
            </div>

            <div className='flex md:flex-row flex-col md:gap-4'>
              {' '}
              <div className='flex flex-col mt-5 md:w-1/2'>
                <h1 className='font-bold mb-2'>Available Amenities</h1>
                <div className='flex'>
                  <div className='mr-5'>
                    <div>
                      <input
                        type='checkbox'
                        id='wifi'
                        name='wifi'
                        onChange={formik5.handleChange}
                        value={formik5.values.wifi}
                        checked={formik5.values.wifi}
                        className='mt-2 mr-2'
                      />
                      <label htmlFor='wifi' className='font-bold'>
                        Wifi
                      </label>
                    </div>
                    <div>
                      <input
                        type='checkbox'
                        id='parking'
                        name='parking'
                        onChange={formik5.handleChange}
                        value={formik5.values.parking}
                        checked={formik5.values.parking}
                        className='mt-2 mr-2'
                      />
                      <label htmlFor='parking' className='font-bold'>
                        Parking
                      </label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        type='checkbox'
                        id='breakfast'
                        name='breakfast'
                        onChange={formik5.handleChange}
                        value={formik5.values.breakfast}
                        checked={formik5.values.breakfast}
                        className='mt-2 mr-2'
                      />
                      <label htmlFor='breakfast' className='font-bold'>
                        Breakfast
                      </label>
                    </div>
                    <div>
                      <input
                        type='checkbox'
                        id='pets'
                        name='pets'
                        onChange={formik5.handleChange}
                        value={formik5.values.pets}
                        checked={formik5.values.pets}
                        className='mt-2 mr-2'
                      />
                      <label htmlFor='pets' className='font-bold'>
                        Pets
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex md:flex-row flex-col md:gap-4'>
              {' '}
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='address' className=' font-bold'>
                  Address
                </label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  onChange={formik5.handleChange}
                  value={formik5.values.address}
                  placeholder='Enter venue address'
                  className=' bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='city' className=' font-bold'>
                  City
                </label>
                <input
                  type='text'
                  id='city'
                  name='city'
                  onChange={formik5.handleChange}
                  value={formik5.values.city}
                  placeholder='Enter venue city'
                  className=' bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
            </div>

            <div className='flex md:flex-row flex-col md:gap-4'>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='zip' className=' font-bold'>
                  Zip code
                </label>
                <input
                  type='text'
                  id='zip'
                  name='zip'
                  onChange={formik5.handleChange}
                  value={formik5.values.zip}
                  placeholder='Enter venue zip'
                  className='bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='country' className=' font-bold'>
                  Country
                </label>
                <input
                  type='text'
                  id='country'
                  name='country'
                  onChange={formik5.handleChange}
                  value={formik5.values.country}
                  placeholder='Enter venue country'
                  className='bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
            </div>

            <div className='flex md:flex-row flex-col md:gap-4'>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='latitude' className=' font-bold'>
                  Latitude
                </label>
                <input
                  type='number'
                  id='latitude'
                  name='latitude'
                  onChange={formik5.handleChange}
                  value={formik5.values.latitude}
                  placeholder='Enter venue latitude'
                  className='bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
              <div className='flex flex-col mt-5 md:w-1/2'>
                <label htmlFor='longitude' className=' font-bold'>
                  Longitude
                </label>
                <input
                  type='number'
                  id='longitude'
                  name='longitude'
                  onChange={formik5.handleChange}
                  value={formik5.values.longitude}
                  placeholder='Enter venue longitude'
                  className='bg-secondary border-2 
                 border-green
               rounded-lg p-2 mt-2 mr-2'
                />
              </div>
            </div>
            <div className='flex flex-col mt-5'>
              <label htmlFor='media1' className=' font-bold'>
                Venue Image URLs (Maximum 5 URLs)
              </label>
              <input
                type='url'
                id='media1'
                name='media1'
                onChange={formik5.handleChange}
                value={formik5.values.media1}
                placeholder='https://example.com'
                pattern='https://.*'
                className='bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
              />
              <input
                type='url'
                id='media2'
                name='media2'
                onChange={formik5.handleChange}
                value={formik5.values.media2}
                placeholder='https://example.com'
                pattern='https://.*'
                className='bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
              />
              <input
                type='url'
                id='media3'
                name='media3'
                onChange={formik5.handleChange}
                value={formik5.values.media3}
                placeholder='https://example.com'
                pattern='https://.*'
                className='bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
              />
              <input
                type='url'
                id='media4'
                name='media4'
                onChange={formik5.handleChange}
                value={formik5.values.media4}
                placeholder='https://example.com'
                pattern='https://.*'
                className='bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
              />
              <input
                type='url'
                id='media5'
                name='media5'
                onChange={formik5.handleChange}
                value={formik5.values.media5}
                placeholder='https://example.com'
                pattern='https://.*'
                className='bg-secondary border-2 border-green rounded-lg p-2 mt-2 mr-2'
              />
            </div>
            <div>
              <button type='submit' className='btnPrimary bg-green mt-8 w-full'>
                UPDATE VENUE
              </button>
            </div>
          </form>
        </div>
        <div className='border-[1px] border-green mt-10' />
        <div>
          <h1 className='font-bold mt-4'>DELETE VENUE</h1>
          <p className='mt-2 md:w-2/3 mb-4'>
            <span className='font-bold'>Warning:</span> Deleting this venue will
            permanently remove it from your account. You will lose access to all
            associated information and it cannot be recovered.
          </p>
          <button
            onClick={deleteVenueHandler}
            className='btnPrimary w-full mt-3 md:w-1/3 bg-red-500 hover:outline-red-500'
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVenue;
