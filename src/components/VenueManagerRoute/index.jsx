import { Navigate } from 'react-router-dom';
import { useBearStore } from '../../state/state';

const VenueManagerRoute = ({ children }) => {
  const isUserLoggedIn = useBearStore((state) => state.isUserLoggedIn);
  const isUserVenueManager = useBearStore((state) => state.isUserVenueManager);
  if (isUserLoggedIn && isUserVenueManager) {
    return children;
  } else if (isUserLoggedIn && !isUserVenueManager) {
    return <Navigate to='/profile' />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default VenueManagerRoute;
