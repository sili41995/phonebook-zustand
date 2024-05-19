import { IAuthState, IContactsState } from '@/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authSlice from '@/zustand/auth/slice';
import contactsSlice from '@/zustand/contacts/slice';

export const useAuthStore = create<IAuthState>()(
  devtools(persist(authSlice.slice, authSlice.params), authSlice.params)
);

export const useContactsStore = create<IContactsState>()(devtools(contactsSlice.slice, contactsSlice.params));
