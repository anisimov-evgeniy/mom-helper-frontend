export enum ActivityTypeEnum {
  FEEDING = 'feeding',
  SLEEP = 'sleep',
  // Можно добавить другие типы активностей, например, 'play', 'measurement'
}

export interface ActivityRecordsProps {
  id?: number;
  childId: number;
  activityType: ActivityTypeEnum;
  amount: number;
  startTime: string;
  endTime?: string;
  notes?: string;
}
