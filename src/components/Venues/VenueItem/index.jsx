const VenueItem = ({ venue }) => {
  return (
    <div>
      <figure>
        <img src={venue.media[0]} alt='Travel' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{venue.name}</h2>
        <p>{venue.description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Book</button>
        </div>
      </div>
    </div>
  );
};

export default VenueItem;
