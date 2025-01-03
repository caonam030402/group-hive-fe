export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token?: string;
  refreshToken?: string;
  tokenExpires?: number;
  user: IUser | null;
}

export interface IAuthErrorResponse {
  status?: number;
  errors?: {
    [key: string]: string;
  };
}

export interface IAuthCredentials {
  trigger?: ETriggerCredentials;
  code?: number;
  userId?: number;
}

interface IUserSession extends IUser {
  token?: string;
  refreshToken?: string;
  tokenExpires?: number;
}

declare module "next-auth" {
  interface Session extends IAuthResponse {}
  interface User extends IUserSession {
    error?: string;
  }

  interface JWT {
    user: {
      user: IUser | null;
      token: string;
      refreshToken: string;
      tokenExpires: number;
    };
  }
}

interface IRequestGenerateOtp {
  user: {
    id: number;
  };
  expiresTime: number;
}

interface IRequestConfirmOtp {
  user: {
    id: number;
  };
  code: number;
}

interface IResponseGenerateOtp {
  user: {
    id: number;
  };
  expiresTime: number;
}
