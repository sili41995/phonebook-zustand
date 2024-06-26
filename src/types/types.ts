import { SetURLSearchParams } from 'react-router-dom';

export interface IUpdateSearchParamsProps {
  key: string;
  value?: string;
}

export interface IUseSetSearchParams {
  updateSearchParams: ({ key, value }: IUpdateSearchParamsProps) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export type ProfileEntry = [string, string | boolean | FileList];

export interface IUser {
  name: string;
  email: string;
  avatar: string;
}

export interface ISignUpRes extends IUser {
  user: IUser;
}

export interface ISignInRes extends IUser {
  token: string;
  user: IUser;
}

export interface ICurrentUser extends IUser {
  id: number;
  phone?: string;
  lastName?: string;
  location?: string;
  dateOfBirth?: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ISignUpCredentials extends ICredentials {
  [key: string]: string | FileList | undefined;
  name: string;
  avatar: FileList;
  phone?: string;
  lastName?: string;
  location?: string;
  dateOfBirth?: string;
}

export interface IContact {
  [key: string]: string | number | FileList | boolean | undefined;
  id?: number;
  name: string;
  phone: string;
  role?: string;
  email?: string;
  description?: string;
  tgUsername?: string;
  favorite?: boolean;
  avatar: FileList | string;
}

export interface IAvatar {
  [key: string]: FileList | number | string | undefined;
  id?: number;
  avatar: FileList | string;
}

export interface IContactStatus {
  favorite: boolean;
}

export interface IFetchContactsRes {
  contacts: IContact[];
  count: number;
}

export interface IAuthInitialState {
  user: {
    name: null | string;
    email: null | string;
    avatar: null | string;
  };
  token: null | string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: null | string;
}

export interface IAuthState extends IAuthInitialState {
  signIn: (credentials: ICredentials) => Promise<ISignInRes | undefined>;
  signUp: (data: FormData) => Promise<ISignUpRes | undefined>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<ICurrentUser | undefined>;
  updateUserAvatar: (data: FormData) => Promise<IAvatar | undefined>;
}

export interface IContactsInitialState {
  items: null | IContact[];
  count: null | number;
  isLoading: boolean;
  isLoaded: boolean;
  error: null | string;
}

export interface IContactsState extends IContactsInitialState {
  fetchContacts: () => Promise<IFetchContactsRes | undefined>;
  addContact: (data: FormData) => Promise<IContact | undefined>;
  deleteContact: (id: number) => Promise<IContact | undefined>;
  updateContact: (data: IUpdateContactData) => Promise<IContact | undefined>;
  updateContactStatus: (data: IUpdateContactStatusData) => Promise<IContact | undefined>;
  updateContactAvatar: (data: IUpdateContactAvatarData) => Promise<IAvatar | undefined>;
}

export type SetStateFunc = <T>(partial: Partial<T>, replaceState?: boolean, actionName?: string) => void;

export type GetStateFunc<T> = () => T;

export interface IUpdateContactStatusData {
  data: IContactStatus;
  id: number;
}

export interface IUpdateContactStatusProps {
  data: IUpdateContactStatusData;
  set: SetStateFunc;
  get: GetStateFunc<IContactsState>;
}

export interface IUpdateContactData {
  data: IContact;
  id: number;
}

export interface IUpdateContactProps {
  set: SetStateFunc;
  get: GetStateFunc<IContactsState>;
  data: IUpdateContactData;
}

export interface IUpdateContactAvatarData {
  data: FormData;
  id: number;
}

export interface IUpdateContactAvatarProps {
  data: IUpdateContactAvatarData;
  set: SetStateFunc;
  get: GetStateFunc<IContactsState>;
}

export interface IDeleteContactProps {
  set: SetStateFunc;
  get: GetStateFunc<IContactsState>;
  id: number;
}

export interface IAddContactProps {
  set: SetStateFunc;
  get: GetStateFunc<IContactsState>;
  data: FormData;
}

export interface ISetStateProps {
  set: SetStateFunc;
  name: string;
}

export type SetState<T> = (data: Partial<T>) => void;

export type SetAuthState = SetState<IAuthInitialState>;

export type SetContactsState = SetState<IContactsInitialState>;
