import { useFormik } from 'formik';
import * as Yup from 'yup';

const SearchForm = () => {
  const formik2 = useFormik({
    initialValues: {
      destination: '',
      dateIn: '',
      dateOut: '',
      guests: 1,
    },
    validationSchema: Yup.object({
      destination: Yup.string().required('Please enter destination.'),
      dateIn: Yup.string().required('Please enter check in date.'),
      dateOut: Yup.string().required('Please enter check out date.'),
      guests: Yup.number(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className='bg-green rounded-xl md:p-9 px-4 py-9'>
      <form onSubmit={formik2.handleSubmit} className='max-w-md mx-auto'>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='destination'
            id='destination'
            className='block py-2.5 px-0 w-full text-sm text-secondary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange focus:outline-none focus:ring-0 focus:border-orange peer'
            placeholder=' '
            onChange={formik2.handleChange}
            value={formik2.values.destination}
          />
          {formik2.touched.destination && formik2.errors.destination ? (
            <div className='text-orange'>{formik2.errors.destination}</div>
          ) : null}
          <label
            htmlFor='destination'
            className='peer-focus:font-medium absolute text-md text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange peer-focus:dark:text-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Destination
          </label>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='date'
              name='dateIn'
              id='dateIn'
              className='block py-2.5 px-0 w-full text-sm text-secondary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange focus:outline-none focus:ring-0 focus:border-orange peer'
              placeholder=' '
              onChange={formik2.handleChange}
              value={formik2.values.dateIn}
            />
            {formik2.touched.dateIn && formik2.errors.dateIn ? (
              <div className='text-orange'>{formik2.errors.dateIn}</div>
            ) : null}
            <label
              htmlFor='dateIn'
              className='peer-focus:font-medium absolute text-md text-white
               dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange peer-focus:dark:text-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Check-In
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='date'
              name='dateOut'
              id='dateOut'
              className='block py-2.5 px-0 w-full text-sm text-secondary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange focus:outline-none focus:ring-0 focus:border-orange peer'
              placeholder=' '
              onChange={formik2.handleChange}
              value={formik2.values.dateOut}
            />
            {formik2.touched.dateOut && formik2.errors.dateOut ? (
              <div className='text-orange'>{formik2.errors.dateOut}</div>
            ) : null}
            <label
              htmlFor='dateOut'
              className='peer-focus:font-medium absolute text-md text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange peer-focus:dark:text-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Check-Out
            </label>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='number'
              name='guests'
              id='guests'
              min={1}
              className='block py-2.5 px-0 w-full text-sm text-secondary bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange focus:outline-none focus:ring-0 focus:border-orange peer'
              placeholder=' '
              onChange={formik2.handleChange}
              value={formik2.values.guests}
            />
            <label
              htmlFor='guests'
              className='peer-focus:font-medium absolute text-md text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange peer-focus:dark:text-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Guests
            </label>
          </div>
        </div>
        <button
          type='submit'
          className=' btnSecondary font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center bg-orange'
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
