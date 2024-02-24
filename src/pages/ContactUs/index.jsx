import email from '../../assets/Email.png';
import phone from '../../assets/Phone.png';
import location from '../../assets/Location.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const ContactUs = () => {
  const [messageSent, setMessageSent] = useState(false);

  const formik6 = useFormik({
    initialValues: {
      name: '',
      message: '',
      email: '',
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      message: Yup.string()
        .min(20, 'Please enter min 20 simbols')
        .required('Required'),
      email: Yup.string()
        .matches(
          /^[\w\-.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          'Invalid email address. Please follow this pattern: "name@email.no"'
        )
        .required('Required'),
      agreeTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
    }),
    onSubmit: (values) => {
      const sentMessage = {
        name: values.name,
        message: values.message,
        email: values.email,
        termsAgreed: values.agreeTerms,
      };
      console.log(sentMessage);
      formik6.resetForm();
      setMessageSent(true);
    },
  });

  const handleInputChange = (e) => {
    formik6.handleChange(e);
    if (messageSent) {
      setMessageSent(false);
    }
  };

  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
      <div className='bg-yellow p-10 flex md:flex-row flex-col gap-2'>
        <div>
          <h1 className='fontPrimary font-bold md:text-4xl text-2xl mx-5'>
            Get in touch
          </h1>
          <h3 className='mx-5 mt-5 text-lg'>
            Have a question? Contact us today!
          </h3>
          <div className='mx-5 mt-10 flex gap-2 items-center text-lg'>
            <img src={email} alt='' />
            <p className=''>hello@holidaze.com</p>
          </div>
          <div className='mx-5 mt-3 flex gap-2 items-center text-lg'>
            <img src={phone} alt='' />
            <p className=''>+1 (555) 123-4567</p>
          </div>
          <div className='mx-5 mt-3 flex gap-2 items-center text-lg'>
            <img src={location} alt='' />
            <p className=''>123 Maple Street, Springfield, Anytown 12345</p>
          </div>
        </div>
        <div className=' sm:mt-8'>
          <h3 className='mx-5 text-lg'>
            We're here to help! Feel free to send us a message with any
            questions or concerns.
          </h3>
          <form onSubmit={formik6.handleSubmit}>
            <div className='flex flex-col mx-5 sm:mt-5'>
              <label htmlFor='name' className='font-bold'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                onChange={formik6.handleChange}
                value={formik6.values.name}
                className={`bg-secondary border-2 ${
                  formik6.errors.name ? 'border-red-500' : 'border-green'
                } rounded-lg p-2 mt-2 mr-2`}
              />
              {formik6.touched.name && formik6.errors.name ? (
                <div className=' text-red-500'>{formik6.errors.name}</div>
              ) : null}
            </div>
            <div className='flex flex-col mx-5 sm:mt-5'>
              <label htmlFor='email' className='font-bold'>
                Email<span className=' text-xl text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                onChange={handleInputChange}
                value={formik6.values.email}
                className={`bg-secondary border-2 ${
                  formik6.errors.email ? 'border-red-500' : 'border-green'
                } rounded-lg p-2 mt-2 mr-2`}
              />
              {formik6.touched.email && formik6.errors.email ? (
                <div className='text-red-500'>{formik6.errors.email}</div>
              ) : null}
            </div>
            <div className='flex flex-col mx-5 sm:mt-5'>
              <label htmlFor='message' className=' font-bold'>
                Message<span className=' text-xl text-red-500'>*</span>
              </label>
              <textarea
                id='message'
                name='message'
                onChange={formik6.handleChange}
                value={formik6.values.message}
                rows={4}
                cols={50}
                placeholder='Enter your message'
                className={`bg-secondary border-2 ${
                  formik6.errors.message ? 'border-red-500' : 'border-green'
                } rounded-lg p-2 mt-2 mr-2`}
              />
              {formik6.touched.message && formik6.errors.message ? (
                <div className=' text-red-500'>{formik6.errors.message}</div>
              ) : null}
            </div>
            <div className='flex mx-5 sm:mt-5'>
              <div className='mr-5'>
                <div>
                  <input
                    type='checkbox'
                    id='agreeTerms'
                    name='agreeTerms'
                    onChange={formik6.handleChange}
                    value={formik6.values.agreeTerms}
                    className='mt-2 mr-2'
                  />
                  <label htmlFor='agreeTerms' className='font-bold'>
                    I agree To The Terms
                  </label>
                  {formik6.touched.agreeTerms && formik6.errors.agreeTerms ? (
                    <div className=' text-red-500'>
                      {formik6.errors.agreeTerms}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {messageSent && (
              <p className='font-bold text-xl text-green text-center mt-3'>
                Your message has been sent!
              </p>
            )}
            <div className='flex mx-5 mt-5 sm:mt-10 justify-center'>
              <button type='submit' className='btnPrimary w-1/3 bg-green'>
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
