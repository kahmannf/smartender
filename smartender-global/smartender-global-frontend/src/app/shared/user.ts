export interface User {
  id: number;
  alias: string;
  email: string;
  registerkey: string;
  iat: number;
  exp: number;
  is_admin: number;
}
