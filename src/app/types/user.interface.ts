type Permission =
  | 'read_profile'
  | 'update_profile'
  | 'manage_users'
  | 'read_users'
  | 'create_users'
  | 'update_users'
  | 'delete_users'
  | 'view_analytics';

type Role = 'admin' | 'user';

export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  role: Role;
  githubId?: number;
  avatar?: string;
  loginAttempts: number;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
