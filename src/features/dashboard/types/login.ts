export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}
