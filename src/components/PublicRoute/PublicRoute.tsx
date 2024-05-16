import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IProps } from './PublicRoute.types';
import { PagePaths } from '@/constants';
import { useAuthStore } from '@/zustand/store';
import { selectIsLoggedIn } from '@/zustand/auth/selectors';
import { toasts } from '@/utils';

export const PublicRoute = ({ element, restricted = false }: IProps) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const location = useLocation();
  const shouldRedirect = isLoggedIn && restricted;
  const defaultGoBackPath = `/${PagePaths.contactsPath}`;
  const goBackPath = location.state?.from ?? defaultGoBackPath;
  const isShowWarnToast = location.state && !isLoggedIn;

  useEffect(() => {
    isShowWarnToast && toasts.warnToast('Please, authenticate in the app');
  });

  return shouldRedirect ? <Navigate to={goBackPath} /> : element;
};

export default PublicRoute;
