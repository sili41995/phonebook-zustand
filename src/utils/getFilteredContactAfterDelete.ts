import { IContact } from '@/types/types';

const getFilteredContactAfterDelete = ({
  contacts,
  contactId,
}: {
  contacts: IContact[];
  contactId: number;
}): IContact[] => contacts.filter(({ id }) => id !== contactId);

export default getFilteredContactAfterDelete;
