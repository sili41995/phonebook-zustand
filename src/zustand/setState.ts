interface ISetStateProps<T> {
  set: (partial: Partial<T>, clearState?: boolean, actionName?: string) => void;
  name: string;
}

export type SetState<T> = (data: Partial<T>) => void;

const setState =
  <T>({ set, name }: ISetStateProps<T>): SetState<T> =>
  (data) => {
    set(data, false, name);
  };

export default setState;
