import { IAuthZustandStore } from '@/types/types';

export const selectToken = (state: IAuthZustandStore) => state.token;

export const selectUser = (state: IAuthZustandStore) => state.user;

export const selectIsLoggedIn = (state: IAuthZustandStore) => state.isLoggedIn;

export const selectIsRefreshing = (state: IAuthZustandStore) => state.isRefreshing;

export const selectIsLoading = (state: IAuthZustandStore) => state.isLoading;

export const selectSignIn = (state: IAuthZustandStore) => state.signIn;
