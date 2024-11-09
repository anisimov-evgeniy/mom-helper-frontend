// Методы авторизации
import API from '../api/apiClient.ts';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const authAPI = {
  login: (email: string, password: string) => {
    return API.post<LoginResponse>('/auth/login', {email, password});
  },
  refreshToken: (refreshToken: string) =>
    API.post<LoginResponse>('/auth/refresh-token', {refreshToken}),
};
