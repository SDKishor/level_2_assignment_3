export type TRole = 'admin' | 'user';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
}
