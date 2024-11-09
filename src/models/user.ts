export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  role: UserRoleEnum;
  createdAt: string;
  updatedAt: string;
}
