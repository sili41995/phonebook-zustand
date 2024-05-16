import contactsServiceApi from '@/service/contactsServiceApi';
import { IAuthZustandState, IAvatar, ICredentials, ICurrentUser, ISignInRes } from '@/types/types';

export const signUp = async ({ data, set }: { data: FormData; set: (partial: Partial<IAuthZustandState>) => void }) => {
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
  set: (partial: Partial<IAuthZustandState>) => void;
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
  set: (partial: Partial<IAuthZustandState>) => void;
  get: () => IAuthZustandState;
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

export const signOut = async (set: (partial: Partial<IAuthZustandState>) => void) => {
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
  set: (partial: Partial<IAuthZustandState>) => void;
  get: () => IAuthZustandState;
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
