export interface LoginRequest {
  login: string;
  password: string;
}

export type UserRole = 'READ' | 'WRITE';

export interface RegisterRequest {
  login: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  name: string;
  token: string;
}

export interface RegisterResponse {
  login: string;
  token: string;
}
