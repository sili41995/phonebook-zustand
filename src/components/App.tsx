import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from '@/components/PublicRoute';
import Loader from '@/components/Loader';
import SharedLayout from '@/components/SharedLayout';
import { selectIsRefreshing, selectToken } from '@/redux/auth/selectors';
import { refreshUser } from '@/redux/auth/operations';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { PagePaths } from '@/constants';

const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const SignInPage = lazy(() => import('@/pages/SignInPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactsPage = lazy(() => import('@/pages/ContactsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ContactInfo = lazy(() => import('@/components/ContactInfo'));
const AddContactForm = lazy(() => import('@/components/AddContactForm'));
const ContactDetails = lazy(() => import('@/components/ContactDetails'));
const ContactDescription = lazy(() => import('@/components/ContactDescription'));
const PrivateRoute = lazy(() => import('@/components/PrivateRoute'));

const App = () => {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    dispatch(refreshUser());
  }, [dispatch, token]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path={PagePaths.homePath} element={<SharedLayout />}>
        <Route index element={<PublicRoute restricted element={<SignInPage />} />} />
        <Route path={PagePaths.signInPath} element={<PublicRoute restricted element={<SignInPage />} />} />
        <Route path={PagePaths.signUpPath} element={<PublicRoute restricted element={<SignUpPage />} />} />
        <Route path={PagePaths.aboutPath} element={<PublicRoute element={<AboutPage />} />} />
        <Route path={PagePaths.contactsPath} element={<PrivateRoute element={<ContactsPage />} />}>
          <Route path={`:${PagePaths.dynamicParam}`} element={<ContactDetails />}>
            <Route path={PagePaths.contactPath} element={<ContactInfo />} />
            <Route path={PagePaths.aboutPath} element={<ContactDescription />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path={PagePaths.newContactPath} element={<AddContactForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
