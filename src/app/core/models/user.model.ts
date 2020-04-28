export interface UserRequest {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
}
