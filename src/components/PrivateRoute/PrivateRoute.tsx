import { Navigate, useLocation } from 'react-router-dom';
import { IProps } from './PrivateRoute.types';
import { PagePaths } from '@/constants';
import { useAuthStore } from '@/zustand/store';
import { selectIsLoggedIn, selectIsRefreshing } from '@/zustand/auth/selectors';

const PrivateRoute = ({ element }: IProps) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const isRefreshing = useAuthStore(selectIsRefreshing);
  const location = useLocation();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  const homePath = `/${PagePaths.signInPath}`;

  return shouldRedirect ? <Navigate to={homePath} state={{ from: location }} /> : element;
};

export default PrivateRoute;
