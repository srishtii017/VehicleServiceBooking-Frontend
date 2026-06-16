// Matches LoginResponse.cs in backend
export interface LoginResponse {
  userID: number;
  name: string;
  email: string;
  token: string;
}

// Matches RegisterDto.cs in backend
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

// Matches LoginDto.cs in backend
export interface LoginRequest {
  email: string;
  password: string;
}

// Matches UpdateUserDto.cs in backend
export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  address?: string;
}

// Matches ChangePasswordDto.cs in backend
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Matches User.cs in backend
export interface User {
  userID: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Matches ApiResponse<T> in backend
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

