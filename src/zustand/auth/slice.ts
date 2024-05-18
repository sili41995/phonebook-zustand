import { IAuthState, IAvatar, ICredentials, ICurrentUser, ISignInRes, ISignUpRes } from '@/types/types';
import { refreshUser, signIn, signOut, signUp, updateUserAvatar } from './operations';
import initialState from './initialState';
import setState from '../setState';

const authSlice = (set: (partial: Partial<IAuthState>) => void, get: () => IAuthState) => ({
  ...initialState,
  signIn: async (credentials: ICredentials): Promise<ISignInRes | undefined> => await signIn({ set, credentials }),
  signUp: async (data: FormData): Promise<ISignUpRes | undefined> =>
    await signUp({ data, set: setState({ set, name: 'signUp' }) }),
  signOut: async (): Promise<void> => await signOut(set),
  refreshUser: async (): Promise<ICurrentUser | undefined> => await refreshUser({ set, get }),
  updateUserAvatar: async (data: FormData): Promise<IAvatar | undefined> => await updateUserAvatar({ data, set, get }),
});

const params = {
  name: 'authStore',
  partialize: (state: IAuthState) => ({
    token: state.token,
    user: state.user,
  }),
};

const authSliceParams = {
  slice: authSlice,
  params,
};

export default authSliceParams;
