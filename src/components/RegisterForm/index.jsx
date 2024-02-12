import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../services/api';

const RegisterForm = () => {
  const queryClient = useQueryClient();

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log(data);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^[\w]+$/,
          'Invalid name. Only alphanumeric characters are allowed. For example: "John123"'
        )
        .required('Required'),
      email: Yup.string()
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
      console.log(values);
      registerUserMutation.mutate(values);
    },
  });

  return (
    <form
      className='flex flex-col w-1/2 mx-auto space-y-2'
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor='name'>Name:</label>
      <input
        className='border border-gray-400 rounded p-1'
        type='text'
        id='name'
        name='name'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor='email'>Email:</label>
      <input
        className='border border-gray-400 rounded p-1'
        type='email'
        id='email'
        name='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor='password'>Password:</label>
      <input
        className='border border-gray-400 rounded p-1'
        type='password'
        id='password'
        name='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterForm;
