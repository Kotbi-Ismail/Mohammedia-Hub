import api from './api';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};