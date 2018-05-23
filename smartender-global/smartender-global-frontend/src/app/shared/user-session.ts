import { Machine } from './machine';

export interface UserSession {
  session_id: number;
  user_id: number;
  can_edit_machine: number;
  can_edit_session: number;
  active: number;
  is_owner: number;
  is_user_active_session: number;
  name: string;
  machine: Machine;
}
