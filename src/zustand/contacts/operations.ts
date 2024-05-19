import contactsServiceApi from '@/service/contactsServiceApi';
import {
  IAddContactProps,
  IAvatar,
  IContact,
  IDeleteContactProps,
  IFetchContactsRes,
  IUpdateContactAvatarProps,
  IUpdateContactProps,
  IUpdateContactStatusProps,
  SetContactsState,
} from '@/types/types';
import { getFilteredContactAfterDelete } from '@/utils';
import getUpdatedContacts from '@/utils/getUpdatedContacts';
import initialState from './initialState';

export const fetchContacts = async (set: SetContactsState): Promise<IFetchContactsRes | undefined> => {
  try {
    set({ isLoading: true, error: initialState.error });

    const response = await contactsServiceApi.fetchContacts();

    set({
      items: response.contacts,
      count: response.count,
      isLoaded: true,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};

export const addContact = async ({ data, set, get }: IAddContactProps): Promise<IContact | undefined> => {
  const { items: contacts } = get();

  try {
    set({ isLoading: true, error: initialState.error });
    const response = await contactsServiceApi.addContact(data);
    set({ items: [...contacts!, response] });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};

export const deleteContact = async ({ id, set, get }: IDeleteContactProps): Promise<IContact | undefined> => {
  const { items: contacts } = get();

  try {
    set({ isLoading: true, error: initialState.error });
    const response = await contactsServiceApi.deleteContact(id);
    const updatedContacts = getFilteredContactAfterDelete({ contacts: contacts!, contactId: response.id! });
    set({ items: updatedContacts });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};

export const updateContact = async ({ data, set, get }: IUpdateContactProps): Promise<IContact | undefined> => {
  const { items: contacts } = get();

  try {
    set({ isLoading: true, error: initialState.error });
    const response = await contactsServiceApi.updateContact(data);
    const updatedContacts = getUpdatedContacts({ contacts: contacts!, updatedContact: response });
    set({ items: updatedContacts });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};

export const updateContactStatus = async ({
  data,
  set,
  get,
}: IUpdateContactStatusProps): Promise<IContact | undefined> => {
  const { items: contacts } = get();

  try {
    set({ isLoading: true, error: initialState.error });
    const response = await contactsServiceApi.updateContactStatus(data);
    const updatedContacts = getUpdatedContacts({ contacts: contacts!, updatedContact: response });
    set({ items: updatedContacts });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};

export const updateContactAvatar = async ({
  data,
  set,
  get,
}: IUpdateContactAvatarProps): Promise<IAvatar | undefined> => {
  const { items: contacts } = get();

  try {
    set({ isLoading: true, error: initialState.error });
    const response = await contactsServiceApi.updateContactAvatar(data);
    const updatedContacts = getUpdatedContacts({ contacts: contacts!, updatedContact: response });
    set({ items: updatedContacts });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};
