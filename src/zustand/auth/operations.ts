import contactsServiceApi from '@/service/contactsServiceApi';
import { IAuthZustandStore, ICredentials, ICurrentUser, ISignInRes } from '@/types/types';

export const signIn = async ({
  credentials,
  set,
}: {
  credentials: ICredentials;
  set: (partial: Partial<IAuthZustandStore>) => void;
}): Promise<ISignInRes | undefined> => {
  try {
    set({ isLoading: true, error: '' });
    const response = await contactsServiceApi.signInUser(credentials);
    contactsServiceApi.token = response.token;
    set({
      isLoggedIn: true,
      token: response.token,
      user: { avatar: response.user.avatar, name: response.user.name, email: response.user.email },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
    }
  } finally {
    set({ isLoading: false, isRefreshing: false });
  }
};

export const refreshUser = async (
  set: (partial: Partial<IAuthZustandStore>) => void,
  get: () => IAuthZustandStore
): Promise<ICurrentUser | undefined> => {
  const { token } = get();

  contactsServiceApi.token = token;
  try {
    set({ isLoading: true, isRefreshing: true, error: '' });
    const response = await contactsServiceApi.refreshUser();
    const { avatar, email, name } = response;
    set({ user: { avatar, email, name }, isLoggedIn: true });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
    }
  } finally {
    set({ isLoading: false, isRefreshing: false });
  }
};
