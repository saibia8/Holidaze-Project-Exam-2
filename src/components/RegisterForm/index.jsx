import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/login');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      emailId: '',
      password: '',
      avatar: '',
      venueManager: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^[\w]+$/,
          'Invalid name. Only alphanumeric characters are allowed. For example: "John123"'
        )
        .required('Required'),
      emailId: Yup.string()
        .matches(
          /^[\w\-.]+@(stud\.)?noroff\.no$/i,
          'Invalid email address. Please follow this pattern: "name@noroff.no" or "name@stud.noroff.no"'
        )
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
      avatar: Yup.string().url('Invalid URL'),
      venueManager: Yup.boolean(),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.name,
        email: values.emailId,
        password: values.password,
        avatar: values.avatar,
        venueManager: values.venueManager,
      };
      registerUserMutation.mutate(data);
    },
  });

  return (
    <div className='bg-green rounded-lg p-6'>
      <form
        className='flex flex-col w-5/6 mx-auto'
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor='name' className='font-bold mt-4'>
          Name:
        </label>
        <input
          className='border text-primary border-gray-400 rounded p-1'
          type='text'
          id='name'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className='text-orange'>{formik.errors.name}</div>
        ) : null}

        <label htmlFor='emailId' className='font-bold mt-4'>
          Email:
        </label>
        <input
          className='border text-primary border-gray-400 rounded p-1'
          type='email'
          id='emailId'
          name='emailId'
          onChange={formik.handleChange}
          value={formik.values.emailId}
        />
        {formik.touched.emailId && formik.errors.emailId ? (
          <div className='text-orange'>{formik.errors.emailId}</div>
        ) : null}

        <label htmlFor='password' className='font-bold mt-4'>
          Password:
        </label>
        <input
          className='border text-primary border-gray-400 rounded p-1'
          type='password'
          id='password'
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='text-orange'>{formik.errors.password}</div>
        ) : null}

        <label htmlFor='avatar' className='relative float-left font-bold mt-4'>
          Avatar URL (optional):
        </label>
        <input
          className='border text-primary border-gray-400 rounded p-1'
          type='url'
          name='avatar'
          id='avatar'
          placeholder='https://example.com'
          pattern='https://.*'
          size='30'
          onChange={formik.handleChange}
          value={formik.values.url}
        />
        {formik.touched.avatar && formik.errors.avatar ? (
          <div className='text-orange'>{formik.errors.avatar}</div>
        ) : null}

        <div className='mb-6 mt-4 flex min-h-[1.5rem] pl-[1.5rem]'>
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent "
            type='checkbox'
            onChange={formik.handleChange}
            value={formik.values.venueManager}
            id='venueManager'
          />
          <label
            className='inline-block pl-[0.15rem] hover:cursor-pointer'
            htmlFor='venueManager'
          >
            Register as Venue Manager
          </label>
        </div>

        <button type='submit' className='btnSecondary bg-orange mt-6'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
