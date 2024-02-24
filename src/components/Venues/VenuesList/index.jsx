import VenueItem from '../VenueItem';

const VenuesList = ({ venues }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto'>
      {venues.map((venue) => (
        <VenueItem
          key={venue.id}
          id={venue.id}
          media={venue.media}
          name={venue.name}
          location={venue.location}
          rating={venue.rating}
          price={venue.price}
          meta={venue.meta}
          owner={venue.owner}
        />
      ))}
    </div>
  );
};

export default VenuesList;
