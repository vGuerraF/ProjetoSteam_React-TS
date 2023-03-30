import Profile from "./profiles";

interface User {
  id: string;
  user_name: string;
  email: string;
  is_admin: boolean;
  cpf: string;
  profiles: Partial<Profile>[];
  created_at: Date;
  updated_at: Date;
}

export default User;
