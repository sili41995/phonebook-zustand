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
  SetContactsStateFunc,
} from '@/types/types';
import { getFilteredContactAfterDelete } from '@/utils';
import getUpdatedContacts from '@/utils/getUpdatedContacts';
import initialState from './initialState';
import setState from '@/zustand/setState';

export const fetchContacts = async (set: SetContactsStateFunc): Promise<IFetchContactsRes | undefined> => {
  const operationName = 'fetchContacts';

  try {
    const pendingData = { isLoading: true, error: initialState.error };
    setState({
      set,
      data: pendingData,
      name: operationName,
    });

    const response = await contactsServiceApi.fetchContacts();

    const resolvedData = {
      items: response.contacts,
      count: response.count,
      isLoaded: true,
    };
    setState({
      set,
      data: resolvedData,
      name: operationName,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      const rejectedData = { error: error.message };
      setState({ set, data: rejectedData, name: operationName });
      throw new Error(error.message);
    }
  } finally {
    const finallyData = { isLoading: initialState.isLoading };
    setState({ set, data: finallyData, name: operationName });
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
    const updatedContacts = getFilteredContactAfterDelete({ contacts: contacts!, id: response._id! });
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
