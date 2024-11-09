// Методы авторизации
import API from '../api/apiClient.ts';

interface LoginProps {
  access_token: string;
  refresh_token: string;
}

export const authAPI = {
  login: (email: string, password: string) => {
    return API.post<LoginProps>('/auth/login', {email, password});
  },
  refreshToken: (refreshToken: string) =>
    API.post<LoginProps>('/auth/refresh-token', {refreshToken}),
};
