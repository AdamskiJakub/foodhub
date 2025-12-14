export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    dateOfBirth: Date | null;
    location: string | null;
    phoneNumber: string | null;
    address: string | null;
  };
}

// Restaurant API types
export interface CommentRequest {
  restaurantId: number;
  content: string;
}

export interface RatingRequest {
  restaurantId: number;
  value: number;
}

export interface UpdateProfileRequest {
  name?: string;
  dateOfBirth?: string;
  location?: string;
  phoneNumber?: string;
  address?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
