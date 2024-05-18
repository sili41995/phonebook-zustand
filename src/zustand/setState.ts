interface ISetStateProps<T> {
  set: (partial: Partial<T>, clearState?: boolean, actionName?: string) => void;
  data: Partial<T>;
  name: string;
}

const setState = <T>({ set, data, name }: ISetStateProps<T>): void => {
  set(data, false, name);
};

export default setState;
