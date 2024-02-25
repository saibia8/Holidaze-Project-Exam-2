import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileByName, updateProfile } from '../../services/api';
import { useBearStore } from '../../state/state';
import { useFormik } from 'formik';
import profilePicture from '../../assets/profilePictureDefault.png';
import * as Yup from 'yup';

const ProfileUpdate = () => {
  const name = useBearStore((state) => state.userInfo?.name);
  const queryClient = useQueryClient();

  const profileUpdateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['venues', name] });
    },
  });

  const {
    isPending,
    isError,
    data: profile,
    error,
  } = useQuery({
    queryKey: ['venues', name],
    queryFn: () => getProfileByName(name),
  });

  const formik4 = useFormik({
    initialValues: {
      avatar: '',
    },
    validationSchema: Yup.object({
      avatar: Yup.string('Please enter a URL')
        .url('Invalid URL')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const data = {
        avatar: values.avatar,
      };
      profileUpdateMutation.mutate(data);
    },
  });

  if (isPending)
    return (
      <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
        <span>Loading...</span>
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
      <div className='bg-yellow flex flex-col p-10 max-w-3xl m-auto'>
        <h1 className='text-center md:text-3xl text-2xl fontPrimary font-bold'>
          Change Your Account Settings
        </h1>
        <img
          src={profile.avatar === '' ? profilePicture : profile.avatar}
          alt=''
          className='mx-auto mt-4 rounded-full'
        />
        <form onSubmit={formik4.handleSubmit}>
          <div className='mr-4 mt-4 pb-5 flex flex-col'>
            <label htmlFor='avatar' className='font-bold'>
              Avatar URL
            </label>
            <input
              type='url'
              id='avatar'
              name='avatar'
              placeholder='https://example.com'
              pattern='https://.*'
              size='30'
              onChange={formik4.handleChange}
              value={formik4.values.avatar}
              className={`bg-secondary border-2 
            rounded-lg p-2 mt-2 mr-2 ${
              formik4.errors.avatar ? 'border-red-500' : 'border-green'
            }`}
            />
            {formik4.touched.avatar && formik4.errors.avatar ? (
              <div className=' text-red-500'>{formik4.errors.avatar}</div>
            ) : null}
          </div>
          <div className='mr-4 mt-4 pb-5 flex flex-col'>
            <label htmlFor='username' className='font-bold'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={profile.name}
              disabled
              className=' bg-gray-100 border-2 
            rounded-lg p-2 mt-2 mr-2'
            />
          </div>
          <div className='mr-4 mt-4 pb-5 flex flex-col'>
            <label htmlFor='email' className='font-bold'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={profile.email}
              disabled
              className=' bg-gray-100 border-2 
            rounded-lg p-2 mt-2 mr-2'
            />
          </div>
          <button className='btnPrimary mt-8 w-full'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
