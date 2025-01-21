interface IAuthStore {
  token?: string;
  refreshToken?: string;
  tokenExpires?: number;
}

interface IUserState {
  auth: IAuthStore;
}

interface IPhoto {
  id: string;
  path: string;
}

interface IRole {
  id: number;
  name: string;
}

interface IStatus {
  id: number;
  name: string;
}

interface IUser {
  id?: number;
  email?: string;
  provider?: string;
  name?: string;
  socialId?: string;
  firstName?: string;
  lastName?: string;
  photo?: Photo;
  avatar?: string;
  role?: Role;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isVerified?: number;
}

interface IMenuUser {
  id: string;
  title?: string;
  href?: string;
  icon?: string;
  action?: () => void;
}

interface IMenuUserOption extends IMenuUser {
  children?: IMenuUser[];
}
