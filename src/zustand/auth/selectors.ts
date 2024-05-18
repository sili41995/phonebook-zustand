import { IAuthState } from '@/types/types';

export const selectToken = (state: IAuthState) => state.token;

export const selectUser = (state: IAuthState) => state.user;

export const selectIsLoggedIn = (state: IAuthState) => state.isLoggedIn;

export const selectIsRefreshing = (state: IAuthState) => state.isRefreshing;

export const selectError = (state: IAuthState) => state.error;

export const selectIsLoading = (state: IAuthState) => state.isLoading;

export const selectSignIn = (state: IAuthState) => state.signIn;

export const selectSignUp = (state: IAuthState) => state.signUp;

export const selectSignOut = (state: IAuthState) => state.signOut;

export const selectRefreshUser = (state: IAuthState) => state.refreshUser;

export const selectUpdateUserAvatar = (state: IAuthState) => state.updateUserAvatar;
