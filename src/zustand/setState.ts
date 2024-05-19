import { ISetStateProps, SetState } from '@/types/types';

const setState =
  <T>({ set, name }: ISetStateProps): SetState<T> =>
  (data) => {
    set(data, false, name);
  };

export default setState;
