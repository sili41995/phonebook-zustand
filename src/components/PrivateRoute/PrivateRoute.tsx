import { Navigate, useLocation } from 'react-router-dom';
import { IProps } from './PrivateRoute.types';
import { PagePaths } from '@/constants';

const PrivateRoute = ({ element }: IProps) => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const isRefreshing = useAppSelector(selectIsRefreshing);
  const location = useLocation();
  // const shouldRedirect = !isLoggedIn && !isRefreshing;
  const shouldRedirect = true;
  const homePath = `/${PagePaths.signInPath}`;

  return shouldRedirect ? <Navigate to={homePath} state={{ from: location }} /> : element;
};

export default PrivateRoute;
