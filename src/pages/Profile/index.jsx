import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileByName, updateVenueManager } from '../../services/api';
import { useBearStore } from '../../state/state';
import profilePicture from '../../assets/profilePictureDefault.png';
import BookingsList from '../../components/Bookings/BookingsList';
import { Link } from 'react-router-dom';

const Profile = () => {
  const name = useBearStore((state) => state.userInfo?.name);
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    data: profile,
    error,
  } = useQuery({
    queryKey: ['venues', name],
    queryFn: () => getProfileByName(name),
  });

  const profileUpdateVenueManagerMutation = useMutation({
    mutationFn: updateVenueManager,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['venues', name] });
      console.log(data);
    },
  });

  const updateToVenueManager = () => {
    profileUpdateVenueManagerMutation.mutate({ venueManager: true });
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
              className='rounded-full'
            />
          </div>
          <div className='pt-4'>
            <h3 className='mb-3 text-lg'>
              <span className='font-bold'>Username:</span> {profile.name}
            </h3>
            <h3 className='mb-8 text-lg'>
              <span className='font-bold'>Email:</span> {profile.email}
            </h3>
            <Link to='/profile-update'>
              <button className='bg-yellow w-full py-1 px-4 transition-all duration-300 rounded outline outline-2 outline-green hover:text-yellow hover:bg-green'>
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
      {!profile.venueManager && (
        <div className='bg-yellow p-8 flex justify-center'>
          <button onClick={updateToVenueManager} className='btnPrimary py-1'>
            Become A Venue Manager
          </button>
        </div>
      )}
      {profile.venueManager && (
        <div className='bg-secondary p-10 flex flex-col max-w-3xl m-auto'>
          <h1 className='fontPrimary text-2xl md:text-4xl font-bold mb-7 text-center mt-4'>
            Unlock Your Venue's Potential: Register New Venue Now!
          </h1>
          <Link
            to='/create-venue'
            className='btnPrimary py-1 w-2/3 mx-auto text-center'
          >
            REGISTER NEW VENUE
          </Link>
        </div>
      )}
      <div className={`pt-6 pb-12 ${profile.venueManager && 'bg-yellow'}`}>
        <h1 className='fontPrimary text-2xl md:text-4xl font-bold text-center mb-4 mt-8'>
          Your upcoming bookings
        </h1>
        <BookingsList bookings={profile.bookings} />
      </div>
    </div>
  );
};

export default Profile;
