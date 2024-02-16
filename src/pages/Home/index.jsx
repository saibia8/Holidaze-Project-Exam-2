import hoteltravel from '../../assets/Hotel-travel.png';
import SearchForm from '../../components/SearchForm';
import breakfastImg from '../../assets/cafe.png';
import wifiImg from '../../assets/wiFi.png';
import parkingImg from '../../assets/parking.png';
import petsImg from '../../assets/footprint.png';
import star from '../../assets/Star.png';

const venues = [
  {
    id: '5832a149-88b2-4f1a-9d14-13f361a8b523',
    media: [
      'https://images.unsplash.com/photo-1583878594798-c31409c8ab4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    name: 'Holly Jolly',
    location: {
      city: 'New York',
      country: 'USA',
    },
    rating: 5,
    price: 200,
    meta: {
      wifi: true,
      parking: true,
      breakfast: true,
      pets: true,
    },
  },
  {
    id: '4878f09d-3bf4-404c-b9e7-608a07be2ddd',
    media: [],
    name: 'Holly Jolly',
    location: {
      city: 'New York',
      country: 'USA',
    },
    rating: 3,
    price: 1200,
    meta: {
      wifi: false,
      parking: true,
      breakfast: false,
      pets: true,
    },
  },
  {
    id: 'a0be0b9c-d4c9-4070-8378-3c4544cec7bc',
    media: [
      'https://source.unsplash.com/1600x900/?hotel',
      'https://picsum.photos/id/42/3456/2304',
    ],
    name: 'Hamburg lux House update',
    location: {
      city: 'New York',
      country: 'USA',
    },
    rating: 4,
    price: 600,
    meta: {
      wifi: true,
      parking: true,
      breakfast: true,
      pets: false,
    },
  },
];

const Home = () => {
  return (
    <>
      <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-24 bg-yellow'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8  '>
          {/* about image */}
          <div className='md:w-1/2'>
            <img src={hoteltravel} alt='' />
          </div>

          {/* about content */}
          <div className='md:w-2/5'>
            <h2 className='md:text-5xl text-3xl font-bold text-primary fontPrimary mb-5 leading-normal'>
              Discover Your Dream Destinations with Holidaze
            </h2>
            <p className='text-tartiary text-lg mb-7'>
              Plan your perfect getaway and book accommodations hassle-free.
            </p>
            <SearchForm />
          </div>
        </div>
      </div>
      <div className='md:px-14 p-4 max-w-s mx-auto py-10'>
        <div className='text-center'>
          {/* popular destinations */}
          <h2 className='md:text-5xl text-3xl font-extrabold fontPrimary text-primary mb-2'>
            Most Popular Venues
          </h2>
        </div>

        {/* inserting cards with popular destinations */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto'>
          {venues.map((venue) => (
            <div
              key={venue.id}
              className='border-2 border-green py-10 md:px-6 px-4 rounded-lg shadow-3xl'
            >
              <div>
                <img src={venue.media[0]} alt='' />
              </div>
              <h3 className='text-3xl font-bold text-center text-primary'>
                {venue.name}
              </h3>
              <p className='text-tartiary text-center my-5'>
                {venue.location.city}, {venue.location.country}
              </p>
              <p className='mt-5 text-center text-primary text-xl font-bold'>
                ${venue.price}/night
              </p>
              <div className='flex flex-row justify-between'>
                <ul className='mt-4 px-4 flex flex-row'>
                  <li className='flex gap-3 items-center'>
                    <img src={breakfastImg} alt='' className='w-6 h-6' />
                  </li>
                  <li className='flex gap-3 items-center'>
                    <img src={parkingImg} alt='' className='w-6 h-6' />
                  </li>
                  <li className='flex gap-3 items-center'>
                    <img src={petsImg} alt='' className='w-6 h-6' />
                  </li>
                  <li className='flex gap-3 items-center'>
                    <img src={wifiImg} alt='' className='w-6 h-6' />
                  </li>
                </ul>
                <div className='mt-4 px-4 flex flex-row'>
                  <p className='flex flex-row items-center'>
                    <img src={star} alt='' className='w-5 h-5 mr-1' />{' '}
                    <span className='font-bold text-lg'>{venue.rating}</span>
                  </p>
                </div>
              </div>
              <div className='w-full mx-auto mt-8 flex items-center justify-center'>
                <button className='btnSecondary rounded-xl'>Book</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
