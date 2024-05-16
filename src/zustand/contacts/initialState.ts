import { IContactsZustandInitialState } from '@/types/types';

const initialState: IContactsZustandInitialState = {
  items: [],
  count: 0,
  isLoading: false,
  isLoaded: false,
  error: '',
};

export default initialState;
