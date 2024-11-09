// Методы авторизации
import API from '../api/apiClient.ts';
import {UserProps} from '../models/user.ts';

const BASE_URL = '/user';

export const userAPI = {
  getUserInfo: () => API.get<UserProps>(`${BASE_URL}/me`),
  editUserById: (id: number) =>
    API.put<Partial<UserProps>>(`${BASE_URL}/${id}`),

  // Админские запросы
  create: () => API.post<UserProps>(BASE_URL),
  getUsers: () => API.get<UserProps[]>(BASE_URL),
  getUserById: (id: number) => API.get<UserProps>(`${BASE_URL}/${id}`),
  deleteUser: (id: number) => API.delete<UserProps>(`${BASE_URL}/${id}`),
};
