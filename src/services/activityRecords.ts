// Методы авторизации
import API from '../api/apiClient.ts';

interface ChildrenResponse {
  id: number;
  name: string;
  email: string;
}

export const childrenAPI = {
  create: () => API.post<ChildrenResponse>('/children'),
  getChildren: () => API.get<ChildrenResponse>('/children'),
  getChildById: (id: number) => API.get<ChildrenResponse>(`/children${id}`),
  deleteChild: (id: number) => API.get<ChildrenResponse>(`/children${id}`),
};
