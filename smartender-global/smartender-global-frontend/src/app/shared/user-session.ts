export interface UserSession {
  session_id: number;
  user_id: number;
  can_edit_machine: number;
  is_owner: number;
  is_user_active_session: number;
  name: string;
}
