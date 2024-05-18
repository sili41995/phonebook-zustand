import { IContactsState, SetContactsStateFunc } from '@/types/types';

interface ISetStateProps {
  set: SetContactsStateFunc;
  data: Partial<IContactsState>;
  name: string;
}

const setState = ({ set, data, name }: ISetStateProps): void => {
  set(data, false, name);
};

export default setState;
