export interface AuthState {
  status: boolean;
  userData: any;
}

export interface RootState {
  auth: AuthState;
}

export interface Config {
  API_ENDPOINT: string;
  PROJECT_ID: string;
  DATABASE_ID: string;
  COLLECTION_ID_POSTS: string;
  COLLECTION_ID_PROFILE: string;
  AVATAR_ID: string;
  FEATURED_IMAGE_ID: string;
}

export interface CreateNewAccount {
  email: string;
  password: string;
  name: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  labelclasses?: string;
  className?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
