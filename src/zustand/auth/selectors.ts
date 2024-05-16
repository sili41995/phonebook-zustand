import { IAuthZustandStore } from '@/types/types';

export const selectToken = (state: IAuthZustandStore) => state.token;

export const selectUser = (state: IAuthZustandStore) => state.user;

export const selectIsLoggedIn = (state: IAuthZustandStore) => state.isLoggedIn;

export const selectIsRefreshing = (state: IAuthZustandStore) => state.isRefreshing;

export const selectError = (state: IAuthZustandStore) => state.error;

export const selectIsLoading = (state: IAuthZustandStore) => state.isLoading;

export const selectSignIn = (state: IAuthZustandStore) => state.signIn;

export const selectSignUp = (state: IAuthZustandStore) => state.signUp;

export const selectSignOut = (state: IAuthZustandStore) => state.signOut;

export const selectRefreshUser = (state: IAuthZustandStore) => state.refreshUser;

export const selectUpdateUserAvatar = (state: IAuthZustandStore) => state.updateUserAvatar;
