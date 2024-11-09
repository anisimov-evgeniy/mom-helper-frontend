// Методы авторизации
import API from '../api/apiClient.ts';

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export const userAPI = {
  getUserInfo: () => API.get<UserResponse>('/user/me'),
  // Админские запросы
  create: () => API.post<UserResponse>('/user'),
  getUsers: () => API.get<UserResponse>('/user'),
  getUserById: (id: number) => API.get<UserResponse>(`/user${id}`),
  deleteUser: (id: number) => API.get<UserResponse>(`/user${id}`),
};
