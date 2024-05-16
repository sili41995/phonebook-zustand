import { IAuthZustandState } from '@/types/types';

export const selectToken = (state: IAuthZustandState) => state.token;

export const selectUser = (state: IAuthZustandState) => state.user;

export const selectIsLoggedIn = (state: IAuthZustandState) => state.isLoggedIn;

export const selectIsRefreshing = (state: IAuthZustandState) => state.isRefreshing;

export const selectError = (state: IAuthZustandState) => state.error;

export const selectIsLoading = (state: IAuthZustandState) => state.isLoading;

export const selectSignIn = (state: IAuthZustandState) => state.signIn;

export const selectSignUp = (state: IAuthZustandState) => state.signUp;

export const selectSignOut = (state: IAuthZustandState) => state.signOut;

export const selectRefreshUser = (state: IAuthZustandState) => state.refreshUser;

export const selectUpdateUserAvatar = (state: IAuthZustandState) => state.updateUserAvatar;
