import { IAuthZustandStore, IAvatar, ICredentials, ICurrentUser, ISignInRes, ISignUpRes } from '@/types/types';
import { refreshUser, signIn, signOut, signUp, updateUserAvatar } from './operations';

const authSlice = (set: (partial: Partial<IAuthZustandStore>) => void, get: () => IAuthZustandStore) => ({
  user: {
    name: '',
    email: '',
    avatar: '',
  },
  token: '',
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: '',
  signIn: async (credentials: ICredentials): Promise<ISignInRes | undefined> => await signIn({ set, credentials }),
  signUp: async (data: FormData): Promise<ISignUpRes | undefined> => await signUp({ data, set }),
  signOut: async (): Promise<void> => await signOut(set),
  refreshUser: async (): Promise<ICurrentUser | undefined> => await refreshUser({ set, get }),
  updateUserAvatar: async (data: FormData): Promise<IAvatar | undefined> => await updateUserAvatar({ data, set, get }),
});

const params = {
  name: 'authStore',
  partialize: (state: IAuthZustandStore) => ({
    token: state.token,
    user: state.user,
  }),
};

const authSliceParams = {
  slice: authSlice,
  params,
};

export default authSliceParams;
