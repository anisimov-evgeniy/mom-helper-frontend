export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export interface ChildrenProps {
  id?: number;
  name: string;
  birthDate: string;
  gender: GenderEnum;
  userId: 1; // Mom id
}
