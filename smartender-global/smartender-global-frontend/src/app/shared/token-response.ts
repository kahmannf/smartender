import { User } from './user';

export interface TokenResponse {
  token: string;
  user: User;
}
