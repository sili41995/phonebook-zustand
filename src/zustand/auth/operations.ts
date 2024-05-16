import contactsServiceApi from '@/service/contactsServiceApi';
import { IAuthZustandStore, IAvatar, ICredentials, ICurrentUser, ISignInRes } from '@/types/types';

export const signUp = async ({ data, set }: { data: FormData; set: (partial: Partial<IAuthZustandStore>) => void }) => {
  try {
    set({ isLoading: true, error: '' });
    const response = await contactsServiceApi.signUpUser(data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: false });
  }
};

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
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: false });
  }
};

export const refreshUser = async ({
  set,
  get,
}: {
  set: (partial: Partial<IAuthZustandStore>) => void;
  get: () => IAuthZustandStore;
}): Promise<ICurrentUser | undefined> => {
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
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: false, isRefreshing: false });
  }
};

export const signOut = async (set: (partial: Partial<IAuthZustandStore>) => void) => {
  try {
    set({ isLoading: true, error: '' });
    await contactsServiceApi.signOutUser();
    contactsServiceApi.token = '';
    set({ isLoggedIn: false, token: '' });
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: false });
  }
};

export const updateUserAvatar = async ({
  data,
  set,
  get,
}: {
  data: FormData;
  set: (partial: Partial<IAuthZustandStore>) => void;
  get: () => IAuthZustandStore;
}): Promise<IAvatar | undefined> => {
  const { user } = get();

  try {
    set({ isLoading: true, error: '' });
    const response = await contactsServiceApi.updateUserAvatar(data);
    set({ user: { ...user, avatar: response.avatar as string } });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: false });
  }
};
