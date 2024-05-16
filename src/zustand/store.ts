import { IAuthZustandState, IContactsZustandState } from '@/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authSlice from './auth/slice';
import contactsSlice from './contacts/slice';

export const useAuthStore = create<IAuthZustandState>()(devtools(persist(authSlice.slice, authSlice.params)));

export const useContactsStore = create<IContactsZustandState>()(devtools(contactsSlice.slice, contactsSlice.params));
