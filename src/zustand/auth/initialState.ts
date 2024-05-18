import { IAuthInitialState } from '@/types/types';

const initialState: IAuthInitialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

export default initialState;
