import { Navigate } from 'react-router-dom';
import { useBearStore } from '../../state/state';

const PrivateRoute = ({ children }) => {
  const isUserLoggedIn = useBearStore((state) => state.isUserLoggedIn);
  return isUserLoggedIn ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
