import { IContact } from '@/types/types';

const getUpdatedContacts = ({
  contacts,
  updatedContact,
}: {
  contacts: IContact[];
  updatedContact: Partial<IContact>;
}): IContact[] =>
  contacts.map((contact) => (contact._id === updatedContact._id ? { ...contact, ...updatedContact } : contact));

export default getUpdatedContacts;
