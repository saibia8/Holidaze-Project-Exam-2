import { useQuery } from '@tanstack/react-query';
import { getProfileByName } from '../../services/api';
import { useBearStore } from '../../state/state';
import profilePicture from '../../assets/profilePictureDefault.png';
import BookingsList from '../../components/Bookings/BookingsList';

const Profile = () => {
  const name = useBearStore((state) => state.userInfo?.name);

  const {
    isPending,
    isError,
    data: profile,
    error,
  } = useQuery({
    queryKey: ['venues', name],
    queryFn: () => getProfileByName(name),
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
      <div className='bg-yellow flex md:flex-row flex-col p-8'>
        <div className='md:w-1/2 m-4'>
          <h1 className='fontPrimary text-3xl md:text-4xl font-bold mb-4'>
            Welcome back, {profile.name}!
          </h1>
          <p>
            Explore different sections of your dashboard to manage your
            bookings, update your profile, and more.
          </p>
        </div>
        <div className='md:w-1/2 flex gap-8'>
          <div>
            <img
              src={profile.avatar === '' ? profilePicture : profile.avatar}
              alt=''
            />
          </div>
          <div className='pt-4'>
            <h3 className='mb-3 text-lg'>
              <span className='font-bold'>Username:</span> {profile.name}
            </h3>
            <h3 className='mb-8 text-lg'>
              <span className='font-bold'>Email:</span> {profile.email}
            </h3>
            <button className='bg-yellow w-full py-1 px-4 transition-all duration-300 rounded outline outline-2 outline-green hover:text-yellow hover:bg-green'>
              Update Profile
            </button>
          </div>
        </div>
      </div>
      {!profile.venueManager && (
        <div className='bg-yellow p-8 flex justify-center'>
          <button className='btnPrimary py-1'>Become A Venue Manager</button>
        </div>
      )}
      {profile.venueManager && (
        <div className='bg-secondary p-8 flex flex-col justify-center'>
          <h1 className='fontPrimary text-2xl md:text-3xl font-bold mb-4 text-center'>
            Unlock Your Venue's Potential: Register New Venue Now!
          </h1>
          <button className='btnPrimary py-1 w-2/3 mx-auto'>
            REGISTER NEW VENUE
          </button>
        </div>
      )}
      <div>
        <h1 className='fontPrimary text-2xl md:text-4xl font-bold text-center mb-4 mt-10'>
          Your upcoming bookings
        </h1>
        <BookingsList bookings={profile.bookings} />
      </div>
    </div>
  );
};

export default Profile;
