import breakfastImg from '../../../assets/cafe.png';
import wifiImg from '../../../assets/wiFi.png';
import parkingImg from '../../../assets/parking.png';
import petsImg from '../../../assets/footprint.png';
import star from '../../../assets/Star.png';
import noImage from '../../../assets/no_image_available.png';

const VenueItem = ({ id, media, location, name, rating, price, meta }) => {
  return (
    <div className='border-2 border-green py-10 md:px-6 px-4 rounded-lg shadow-3xl'>
      <div className='pb-5'>
        <img
          src={
            media[0] === undefined || media.length === 0 ? noImage : media[0]
          }
          alt=''
          className='w-full h-60 object-cover rounded-lg'
        />
      </div>
      <h3 className='text-3xl font-bold text-center text-primary'>{name}</h3>
      <p className='text-tartiary text-center my-5'>
        {location.city}, {location.country}
      </p>
      <p className='mt-5 text-center text-primary text-xl font-bold'>
        ${price}/night
      </p>
      <div className='flex flex-row justify-between'>
        <ul className='mt-4 px-4 flex flex-row'>
          <li className='flex gap-3 items-center'>
            <img
              src={breakfastImg}
              alt=''
              className={`w-7 h-7 ${
                meta.breakfast ? '' : 'opacity-50 grayscale'
              }`}
            />
          </li>
          <li className='flex gap-3 items-center'>
            <img
              src={parkingImg}
              alt=''
              className={`w-7 h-7 ${
                meta.parking ? '' : 'opacity-50 grayscale'
              }`}
            />
          </li>
          <li className='flex gap-3 items-center'>
            <img
              src={petsImg}
              alt=''
              className={`w-7 h-7 ${meta.pets ? '' : 'opacity-50 grayscale'}`}
            />
          </li>
          <li className='flex gap-3 items-center'>
            <img
              src={wifiImg}
              alt=''
              className={`w-7 h-7 ${meta.wifi ? '' : 'opacity-50 grayscale'}`}
            />
          </li>
        </ul>
        <div className='mt-4 px-4 flex flex-row'>
          <p className='flex flex-row items-center'>
            <img src={star} alt='' className='w-5 h-5 mr-1' />{' '}
            <span className='font-bold text-lg'>{rating}</span>
          </p>
        </div>
      </div>
      <div className='w-full mx-auto mt-8 flex items-center justify-center'>
        <button className='btnSecondary rounded-xl'>Book</button>
      </div>
    </div>
  );
};

export default VenueItem;