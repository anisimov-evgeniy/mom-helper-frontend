// Методы авторизации
import API from '../api/apiClient.ts';
import {ActivityRecordsProps} from '../models/activityRecords.ts';

const BASE_URL = '/activity-records';

export const activityRecordsAPI = {
  create: () => API.post<ActivityRecordsProps>(BASE_URL),
  getActivityRecords: () => API.get<ActivityRecordsProps[]>(BASE_URL),
  getActivityRecordById: (id: number) =>
    API.get<ActivityRecordsProps>(`${BASE_URL}/${id}`),
  deleteActivityRecord: (id: number) =>
    API.get<ActivityRecordsProps>(`${BASE_URL}/${id}`),
};
