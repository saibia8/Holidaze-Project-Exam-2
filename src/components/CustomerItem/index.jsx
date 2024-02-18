import star from '../../assets/Star.png';

const CustomerItem = ({ comments }) => {
  let contentStars = [];

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto'>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className='border-2 border-green py-10 md:px-6 px-4 rounded-lg shadow-3xl'
        >
          <div className='flex mb-4'>
            <img src={star} alt='' />
            <img src={star} alt='' />
            <img src={star} alt='' />
            <img src={star} alt='' />
            <img src={star} alt='' />
          </div>
          <p className='mb-4'>{comment.comment}</p>
          <div className='flex'>
            <img src={comment.image} alt='' className='mr-4' />
            <div>
              <h3>{comment.name}</h3>
              <h3>{comment.job}</h3>
              <h3>{comment.place}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerItem;
