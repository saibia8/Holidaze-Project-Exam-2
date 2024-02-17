const CustomerItem = ({ comments }) => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className='md:w-1/4 border-2 border-green py-10 md:px-6 px-4 rounded-lg shadow-3xl'
        >
          <div className='flex flex-col items-center gap-4'>
            <img
              src={comment.image}
              alt=''
              className='w-20 h-20 rounded-full'
            />
            <h3 className='text-lg font-medium fontPrimary text-primary mb-2'>
              {comment.name}
            </h3>
            <p className='text-secondary text-center'>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerItem;
