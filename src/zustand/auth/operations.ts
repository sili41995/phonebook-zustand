import contactsServiceApi from '@/service/contactsServiceApi';
import { IAuthState, IAvatar, ICredentials, ICurrentUser, ISignInRes } from '@/types/types';
import initialState from './initialState';
import setState from '@/zustand/setState';

export const signUp = async ({ data, set }: { data: FormData; set: (partial: Partial<IAuthState>) => void }) => {
  const operationName = 'signUp';

  try {
    const pendingData = { isLoading: true, error: initialState.error };
    setState({ set, data: pendingData, name: operationName });

    const response = await contactsServiceApi.signUpUser(data);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      const rejectedData = { error: error.message };
      setState({ set, data: rejectedData, name: operationName });
      throw new Error(error.message);
    }
  } finally {
    const finallyData = { isLoading: initialState.isLoading };
    setState({ set, data: finallyData, name: operationName });
  }
};

export const signIn = async ({
  credentials,
  set,
}: {
  credentials: ICredentials;
  set: (partial: Partial<IAuthState>) => void;
}): Promise<ISignInRes | undefined> => {
  try {
    set({ isLoading: true, error: initialState.error });
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
    set({ isLoading: initialState.isLoading });
  }
};

export const refreshUser = async ({
  set,
  get,
}: {
  set: (partial: Partial<IAuthState>) => void;
  get: () => IAuthState;
}): Promise<ICurrentUser | undefined> => {
  const { token } = get();

  contactsServiceApi.token = token;
  try {
    set({ isLoading: true, isRefreshing: true, error: initialState.error });
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
    set({ isLoading: initialState.isLoading, isRefreshing: initialState.isRefreshing });
  }
};

export const signOut = async (set: (partial: Partial<IAuthState>) => void) => {
  try {
    set({ isLoading: true, error: initialState.error });
    await contactsServiceApi.signOutUser();
    contactsServiceApi.token = initialState.token;
    set({ isLoggedIn: initialState.isLoggedIn, token: initialState.token });
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};

export const updateUserAvatar = async ({
  data,
  set,
  get,
}: {
  data: FormData;
  set: (partial: Partial<IAuthState>) => void;
  get: () => IAuthState;
}): Promise<IAvatar | undefined> => {
  const { user } = get();

  try {
    set({ isLoading: true, error: initialState.error });
    const response = await contactsServiceApi.updateUserAvatar(data);
    set({ user: { ...user, avatar: response.avatar as string } });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      set({ error: error.message });
      throw new Error(error.message);
    }
  } finally {
    set({ isLoading: initialState.isLoading });
  }
};
