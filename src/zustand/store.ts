import { IAuthZustandStore } from '@/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authSlice from './auth/slice';

export const useAuthStore = create<IAuthZustandStore>()(devtools(persist(authSlice.slice, authSlice.params)));
