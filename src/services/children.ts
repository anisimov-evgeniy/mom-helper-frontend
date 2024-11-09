// Методы авторизации
import API from '../api/apiClient.ts';
import {ChildrenProps} from '../models/children.ts';

const BASE_URL = '/children';

export const childrenAPI = {
  create: () => API.post<ChildrenProps>(BASE_URL),
  getChildren: () => API.get<ChildrenProps[]>(BASE_URL),
  getChildById: (id: number) => API.get<ChildrenProps>(`${BASE_URL}/${id}`),
  deleteChild: (id: number) => API.get<ChildrenProps>(`${BASE_URL}/${id}`),
};
