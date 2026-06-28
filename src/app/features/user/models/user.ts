
export interface LoginResponse {
  userID: number;
  name: string;
  email: string;
  token: string;
}


export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;

  flatNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;

  password: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;

  flatNumber?: string;
  street?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
}


export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}


export interface User {
  userID: number;
  name: string;
  email: string;
  phone: string;

  flatNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}



export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

