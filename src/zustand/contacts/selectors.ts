import { IContactsState } from '@/types/types';

export const selectContacts = (state: IContactsState) => state.items;

export const selectCount = (state: IContactsState) => state.count;

export const selectIsLoaded = (state: IContactsState) => state.isLoaded;

export const selectIsLoading = (state: IContactsState) => state.isLoading;

export const selectError = (state: IContactsState) => state.error;

export const selectFetchContacts = (state: IContactsState) => state.fetchContacts;

export const selectAddContact = (state: IContactsState) => state.addContact;

export const selectDeleteContact = (state: IContactsState) => state.deleteContact;

export const selectUpdateContact = (state: IContactsState) => state.updateContact;

export const selectUpdateContactStatus = (state: IContactsState) => state.updateContactStatus;

export const selectUpdateContactAvatar = (state: IContactsState) => state.updateContactAvatar;
