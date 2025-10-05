export type UserRole = 'admin' | 'super-admin' | 'employee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}