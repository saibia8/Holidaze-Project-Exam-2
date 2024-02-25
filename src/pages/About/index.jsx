import picture from '../../assets/Hotel-travel-calm-cozy-sunset.jpg';

const About = () => {
  return (
    <div className='md:bg-secondary px-12 p-4 max-w-screen-2xl mx-auto mt-24'>
      <div className='bg-yellow p-10 flex md:flex-row flex-col gap-8'>
        <div className='md:w-1/2'>
          <h1 className='text-3xl fontPrimary font-bold mb-7 ml-5'>
            Welcome to Holidaze - Your Gateway to Unforgettable Getaways!
          </h1>
          <p className='ml-5'>
            At Holidaze, we're passionate about creating memorable experiences
            for travelers worldwide. Whether you're seeking a cozy retreat in
            the mountains or a sun-soaked beachfront escape, our platform is
            designed to help you discover the perfect venue for your next
            adventure.
          </p>
          <p className='ml-5 mt-3'>
            <span className='font-bold'>Our mission</span> is simple: to connect
            travelers with their ideal accommodations while providing venue
            managers with the tools they need to showcase their properties and
            host unforgettable experiences.
          </p>
          <p className='ml-5 mt-3'>
            <span className='font-bold'>For travelers</span>, Holidaze offers a
            seamless booking experience with a diverse range of options to suit
            every taste and budget. From charming bed and breakfasts to
            exclusive luxury villas, our curated selection ensures that you'll
            find the perfect place to call home during your travels.
          </p>
          <p className='ml-5 mt-3'>
            Are you a <span className='font-bold'>property owner</span>? Joining
            Holidaze allows you to reach a global audience of travelers, manage
            your bookings with ease, and showcase the unique features of your
            venue. Our platform empowers you to unlock the full potential of
            your property and create memorable experiences for guests from
            around the world.
          </p>
        </div>
        <div className='md:w-1/2 justify-center'>
          <img src={picture} alt='' />
        </div>
      </div>
    </div>
  );
};

export default About;
