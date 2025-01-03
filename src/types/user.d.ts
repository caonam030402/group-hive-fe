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
  socialId?: string;
  firstName?: string;
  lastName?: string;
  photo?: Photo;
  role?: Role;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isVerified?: boolean;
}
