import { IContact } from '@/types/types';

const getFilteredContactAfterDelete = ({ contacts, id }: { contacts: IContact[]; id: string }): IContact[] =>
  contacts.filter(({ _id }) => id !== _id);

export default getFilteredContactAfterDelete;
