import { SetURLSearchParams } from 'react-router-dom';

export type ProfileEntry = [string, string | boolean | FileList];

export interface IProfile {
  [key: string]: string | boolean | FileList | undefined;
  avatar: FileList | string;
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

export interface IUser {
  name: string;
  email: string;
  avatar: string;
}

export interface ICurrentUser extends IUser {
  _id: string;
  phone?: string;
  lastName?: string;
  location?: string;
  dateOfBirth?: string;
}

export interface ISignInRes extends IUser {
  token: string;
  user: IUser;
}

export interface ISignUpRes extends IUser {
  user: IUser;
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

export interface IFetchContactsRes {
  contacts: IContact[];
  count: number;
}

export interface IAuthState {
  user: IUserState;
  token: null | string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}

interface IUserState {
  name: string | null;
  email: string | null;
  avatar: string | null;
}

export interface IContactsState {
  items: IContact[];
  count: number | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

export interface IState {
  contacts: IContactsState;
  auth: IAuthState;
}

export interface IContactStatus {
  favorite: boolean;
}

export interface IAvatar {
  [key: string]: FileList | string | undefined;
  _id?: string;
  avatar: FileList | string;
}

export interface IUpdateSearchParamsProps {
  key: string;
  value?: string;
}

export interface IUseSetSearchParams {
  updateSearchParams: ({ key, value }: IUpdateSearchParamsProps) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export interface IAuthZustandInitialState {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  token: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string;
}

export interface IAuthZustandState extends IAuthZustandInitialState {
  signIn: (credentials: ICredentials) => Promise<ISignInRes | undefined>;
  signUp: (data: FormData) => Promise<ISignUpRes | undefined>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<ICurrentUser | undefined>;
  updateUserAvatar: (data: FormData) => Promise<IAvatar | undefined>;
}

export interface IContactsZustandInitialState {
  items: IContact[];
  count: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: string;
}

export interface IContactsZustandState extends IContactsZustandInitialState {
  fetchContacts: () => Promise<IFetchContactsRes | undefined>;
  addContact: (data: FormData) => Promise<IContact | undefined>;
  deleteContact: (id: string) => Promise<IContact | undefined>;
  updateContact: (data: IUpdateContactData) => Promise<IContact | undefined>;
  updateContactStatus: (data: IUpdateContactStatusData) => Promise<IContact | undefined>;
  updateContactAvatar: (data: IUpdateContactAvatarData) => Promise<IAvatar | undefined>;
}

export type SetContactsStateFunc = (partial: Partial<IContactsZustandState>) => void;

export type GetContactsStateFunc = () => IContactsZustandState;

export interface IAddContactProps {
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
  data: FormData;
}

export interface IDeleteContactProps {
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
  id: string;
}

export interface IUpdateContactProps {
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
  data: IUpdateContactData;
}

export interface IUpdateContactStatusProps {
  data: IUpdateContactStatusData;
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
}

export interface IUpdateContactAvatarProps {
  data: IUpdateContactAvatarData;
  set: SetContactsStateFunc;
  get: GetContactsStateFunc;
}

export interface IUpdateContactData {
  data: IContact;
  id: string;
}

export interface IUpdateContactStatusData {
  data: IContactStatus;
  id: string;
}

export interface IUpdateContactAvatarData {
  data: FormData;
  id: string;
}
