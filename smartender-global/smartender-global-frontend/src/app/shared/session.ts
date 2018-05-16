import { UserSession } from './user-session';
import { Machine } from './machine';
export interface Session {
  owner_id: number;
  machine_id: number;
  active: number;
  id: number;
  name: string;
  members: UserSession[];
  machine: Machine;
}
