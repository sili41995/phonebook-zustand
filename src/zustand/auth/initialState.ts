import { IAuthZustandInitialState } from '@/types/types';

const initialState: IAuthZustandInitialState = {
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
};

export default initialState;
