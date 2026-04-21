export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  message: string;
  user: AuthUser;
};

export type AuthErrorShape = {
  message: string;
  code?: string;
};
