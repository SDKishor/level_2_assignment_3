export type TRole = 'admin' | 'user';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
}
