import {
  GetStateFunc,
  IAvatar,
  IContact,
  IContactsState,
  IFetchContactsRes,
  IUpdateContactAvatarData,
  IUpdateContactData,
  IUpdateContactStatusData,
  SetStateFunc,
} from '@/types/types';
import initialState from './initialState';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
  updateContactAvatar,
  updateContactStatus,
} from './operations';
import setState from '@/zustand/setState';

const contactsSlice = (set: SetStateFunc, get: GetStateFunc<IContactsState>) => ({
  ...initialState,
  fetchContacts: async (): Promise<IFetchContactsRes | undefined> =>
    await fetchContacts(setState({ set, name: 'fetchContacts' })),
  addContact: async (data: FormData): Promise<IContact | undefined> => await addContact({ data, set, get }),
  deleteContact: async (id: string): Promise<IContact | undefined> => await deleteContact({ set, get, id }),
  updateContact: async (data: IUpdateContactData): Promise<IContact | undefined> =>
    await updateContact({ set, get, data }),
  updateContactStatus: async (data: IUpdateContactStatusData): Promise<IContact | undefined> =>
    await updateContactStatus({ data, set, get }),
  updateContactAvatar: async (data: IUpdateContactAvatarData): Promise<IAvatar | undefined> =>
    await updateContactAvatar({ data, set, get }),
});

const params = {
  name: 'contactsStore',
};

const authSliceParams = {
  slice: contactsSlice,
  params,
};

export default authSliceParams;
