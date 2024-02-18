import { useQuery } from '@tanstack/react-query';
import hoteltravel from '../../assets/Hotel-travel.png';
import hotelrelax from '../../assets/Hotel-book-cocktail-calm-water-sunset-relax.png';
import SearchForm from '../../components/SearchForm';
import VenuesList from '../../components/Venues/VenuesList';
import { getVenuesRating } from '../../services/api';
import CustomerItem from '../../components/CustomerItem';

const comments = [
  {
    id: 1,
    name: 'Mike Nogala',
    comment:
      "I've been using Holidaze for all my business trips and it never disappoints. Great service!",
    image: 'src/assets/mikenogala.png',
    job: 'Student',
    place: 'Paris, France',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    comment:
      'Holidaze made it so easy for me to find the perfect accommodation for my trip. I highly recommend it!',
    image: 'src/assets/janesmith.png',
    job: 'CEO',
    place: 'London, UK',
    rating: 4,
  },
  {
    id: 3,
    name: 'John Doe',
    comment:
      'I had an amazing experience booking my vacation through Holidaze. The website was user-friendly and the customer service was top-notch.',
    image: 'src/assets/johndoe.png',
    job: 'Marketing Manager',
    place: 'New York, USA',
    rating: 5,
  },
];

const Home = () => {
  const {
    isPending,
    isError,
    data: venues,
    error,
  } = useQuery({
    queryKey: ['venuesRating'],
    queryFn: getVenuesRating,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return `Error: ${error.message}`;
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
        <VenuesList venues={venues} />
      </div>

      <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-24 bg-green'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8  '>
          {/* about content */}
          <div className='md:w-2/5'>
            <h2 className='md:text-4xl text-2xl font-medium text-secondary fontPrimary mb-5 leading-normal'>
              Find and Book Your Perfect Accommodation with Ease
            </h2>
            <p className='text-secondary text-lg mb-11'>
              Discover a wide range of accommodations and easily book your next
              stay with Holidaze.
            </p>
            <div className='flex flex-col md:flex-row'>
              <div>
                <h3 className='text-orange text-xl font-medium fontPrimary mb-5'>
                  Easy Booking
                </h3>
                <p className='text-secondary mb-5'>
                  Search, compare, and book from a curated selection of
                  top-rated accommodations.
                </p>
              </div>
              <div>
                <h3 className='text-orange text-xl font-medium fontPrimary mb-5'>
                  Convenient Options
                </h3>
                <p className='text-secondary'>
                  Choose from a variety of accommodations that suit your
                  preferences and budget.
                </p>
              </div>
            </div>
          </div>
          {/* about image */}
          <div className='md:w-1/2 h-[500px] items-center mt-24'>
            <img src={hotelrelax} alt='' className='w-[400px] h-[400px]' />
          </div>
        </div>
      </div>

      <div className='md:px-14 p-4 max-w-s mx-auto py-10'>
        <div className='text-center'>
          {/* customer testimonials */}
          <h2 className='md:text-5xl text-3xl font-extrabold fontPrimary text-primary mb-2'>
            Customer Testimonials
          </h2>
          <h3 className='md:text-2xl text-xl font-medium text-primary mb-8'>
            Read what our customers have to say
          </h3>
        </div>

        {/* inserting cards with customers testimonials */}
        <CustomerItem comments={comments} />
      </div>
    </>
  );
};

export default Home;
