import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import Loader from '@/components/Loader';
import ContactsContainer from '@/components/ContactsContainer';
import contactsServiceApi from '@/service/contactsServiceApi';
import { ICurrentUser } from '@/types/types';
import { toasts } from '@/utils';
import { FetchStatuses } from '@/constants';
import { useContactsStore } from '@/zustand/store';
import { selectFetchContacts, selectIsLoaded } from '@/zustand/contacts/selectors';

const ContactsPage = () => {
  const [user, setUser] = useState<ICurrentUser | null>(null);
  const [fetchUserStatus, setFetchUserStatus] = useState<FetchStatuses>(() => FetchStatuses.idle);
  const isLoadedContacts = useContactsStore(selectIsLoaded);
  const isLoadingUser = fetchUserStatus === FetchStatuses.pending;
  const isLoading = isLoadingUser || !isLoadedContacts;
  const fetchContacts = useContactsStore(selectFetchContacts);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    const getUser = async () => {
      setFetchUserStatus(FetchStatuses.pending);
      try {
        const user = await contactsServiceApi.refreshUser();
        setUser(user);
        setFetchUserStatus(FetchStatuses.resolved);
      } catch (error) {
        if (error instanceof Error) {
          toasts.errorToast(error.message);
          setFetchUserStatus(FetchStatuses.rejected);
        }
      }
    };

    getUser();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {user && <UserProfile user={user} />}
      <ContactsContainer quantity={6} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default ContactsPage;
