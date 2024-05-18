import { IContactsZustandState } from '@/types/types';

export const selectContacts = (state: IContactsZustandState) => state.items;

export const selectCount = (state: IContactsZustandState) => state.count;

export const selectIsLoaded = (state: IContactsZustandState) => state.isLoaded;

export const selectIsLoading = (state: IContactsZustandState) => state.isLoading;

export const selectError = (state: IContactsZustandState) => state.error;

export const selectFetchContacts = (state: IContactsZustandState) => state.fetchContacts;

export const selectAddContact = (state: IContactsZustandState) => state.addContact;

export const selectDeleteContact = (state: IContactsZustandState) => state.deleteContact;

export const selectUpdateContact = (state: IContactsZustandState) => state.updateContact;

export const selectUpdateContactStatus = (state: IContactsZustandState) => state.updateContactStatus;

export const selectUpdateContactAvatar = (state: IContactsZustandState) => state.updateContactAvatar;
