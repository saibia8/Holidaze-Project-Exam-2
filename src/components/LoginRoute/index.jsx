import { Navigate } from 'react-router-dom';
import { useBearStore } from '../../state/state';

const LoginRoute = ({ children }) => {
  const isUserLoggedIn = useBearStore((state) => state.isUserLoggedIn);
  return !isUserLoggedIn ? children : <Navigate to='/profile' />;
};

export default LoginRoute;
