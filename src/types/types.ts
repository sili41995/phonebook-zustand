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
  _id: string;
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
  [key: string]: string | FileList | boolean | undefined;
  _id?: string;
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
  [key: string]: FileList | string | undefined;
  _id?: string;
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
  deleteContact: (id: string) => Promise<IContact | undefined>;
  updateContact: (data: IUpdateContactData) => Promise<IContact | undefined>;
  updateContactStatus: (data: IUpdateContactStatusData) => Promise<IContact | undefined>;
  updateContactAvatar: (data: IUpdateContactAvatarData) => Promise<IAvatar | undefined>;
}

export type SetContactsStateFunc = (partial: Partial<IContactsState>) => void;

export type GetContactsStateFunc = () => IContactsState;

export interface IUpdateContactStatusData {
  data: IContactStatus;
  id: string;
}

export interface IUpdateContactStatusProps {
  data: IUpdateContactStatusData;
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
}

export interface IUpdateContactData {
  data: IContact;
  id: string;
}

export interface IUpdateContactProps {
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
  data: IUpdateContactData;
}

export interface IUpdateContactAvatarData {
  data: FormData;
  id: string;
}

export interface IUpdateContactAvatarProps {
  data: IUpdateContactAvatarData;
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
}

export interface IDeleteContactProps {
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
  id: string;
}

export interface IAddContactProps {
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
  data: FormData;
}
