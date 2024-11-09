// Методы авторизации
import API from '../api/apiClient.ts';
import {LoginProps} from '../models/auth.ts';

const BASE_URL = '/auth';

export const authAPI = {
  login: (email: string, password: string) => {
    return API.post<LoginProps>(`${BASE_URL}/login`, {email, password});
  },
  refreshToken: (refreshToken: string) =>
    API.post<LoginProps>(`${BASE_URL}/refresh-token`, {refreshToken}),
};
