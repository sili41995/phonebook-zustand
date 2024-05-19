import { PagePaths } from '@/constants';
import { toasts } from '@/utils';
import { selectDeleteContact } from '@/zustand/contacts/selectors';
import { useContactsStore } from '@/zustand/store';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useDeleteContact = () => {
  const [contactId, setContactId] = useState<number | null>(null);
  const navigate = useNavigate();
  const deleteContact = useContactsStore(selectDeleteContact);
  const { search, pathname } = useLocation();
  const redirectPath = `/${PagePaths.contactsPath + search}`;

  useEffect(() => {
    if (contactId) {
      deleteContact(contactId)
        .then(() => {
          if (pathname.includes(String(contactId))) {
            navigate(redirectPath);
          }
          toasts.successToast('Contact successfully removed');
        })
        .catch(() => {
          toasts.errorToast('Deleting a contact failed');
        });
    }
  }, [contactId, deleteContact, navigate, pathname, redirectPath]);
  return setContactId;
};

export default useDeleteContact;
