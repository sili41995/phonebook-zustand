import contactsServiceApi from '@/service/contactsServiceApi';
import { IAuthZustandStore, ICredentials, ISignUpRes } from '@/types/types';
import { refreshUser, signIn } from './operations';

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
  signIn: async (credentials: ICredentials): Promise<void> => {
    await signIn({ set, credentials });
  },
  signUp: async (data: FormData): Promise<ISignUpRes | undefined> => {
    try {
      const response = await contactsServiceApi.signUpUser(data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
      }
    }
  },
  signOut: async (): Promise<void> => {},
  refreshUser: async (): Promise<void> => {
    await refreshUser(set, get);
  },
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
