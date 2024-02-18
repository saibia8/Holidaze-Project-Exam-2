import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../services/api';
import { useBearStore } from '../../state/state';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const queryClient = useQueryClient();
  const setIsUserLoggedIn = useBearStore((state) => state.setIsUserLoggedIn);

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'login'] });
      console.log(data.accessToken);
      if (data.accessToken) {
        setIsUserLoggedIn(true);
        navigate('/profile');
      }
    },
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      emailId: '',
      password: '',
    },
    validationSchema: Yup.object({
      emailId: Yup.string()
        .matches(
          /^[\w\-.]+@(stud\.)?noroff\.no$/i,
          'Invalid email address. Please follow this pattern: "name@noroff.no" or "name@stud.noroff.no"'
        )
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const data = {
        email: values.emailId,
        password: values.password,
      };
      loginUserMutation.mutate(data);
    },
  });

  return (
    <div className='bg-green block max-w-md rounded-lg p-6'>
      <form
        className='flex flex-col w-5/6 mx-auto space-y-3 '
        onSubmit={formik.handleSubmit}
      >
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

        <button type='submit' className='btnSecondary bg-orange mt-6'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
