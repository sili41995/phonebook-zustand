import { useMemo, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IProps } from './ContactsContainer.types';
import { SearchParamsKeys } from '@/constants';
import { filterContactsByName, getVisibleContacts, sortContactsByName } from '@/utils';
import ContactsList from '@/components/ContactsList';
import PaginationBar from '@/components/PaginationBar';
import DefaultMessage from '@/components/DefaultMessage';
import { Container } from './ContactsContainer.styled';
import { selectContacts } from '@/zustand/contacts/selectors';
import { useContactsStore } from '@/zustand/store';

const ContactsContainer: FC<IProps> = ({ quantity }) => {
  const contacts = useContactsStore(selectContacts);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get(SearchParamsKeys.FILTER_SP_KEY) ?? '';
  const sortType = searchParams.get(SearchParamsKeys.SORT_SP_KEY) ?? '';
  const currentPage = Number(searchParams.get(SearchParamsKeys.PAGE_SP_KEY) ?? 1);
  const isValidPage = currentPage > 0;

  const filteredContacts = useMemo(() => {
    const sortedContacts = sortContactsByName(contacts!, sortType);
    return filterContactsByName(sortedContacts, filter);
  }, [contacts, filter, sortType]);

  const visibleContacts = getVisibleContacts({
    filteredContacts,
    quantity,
    currentPage,
  });

  const renderContacts = filter ? filteredContacts : visibleContacts;
  const isShouldRenderList = isValidPage && Boolean(renderContacts.length);

  return (
    <Container>
      {isShouldRenderList ? (
        <>
          <ContactsList contacts={renderContacts} />
          {!filter && <PaginationBar quantity={quantity} step={2} itemsQuantity={filteredContacts.length} />}
        </>
      ) : (
        <DefaultMessage message="Contact list is empty" />
      )}
    </Container>
  );
};

export default ContactsContainer;
