// User related types
export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface UserWithRoles extends User {
  roles: Array<{ roleId: number }>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  name?: string;
}

export interface PasswordChangeData {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export interface PasswordResetRequestData {
  email: string;
}

export interface PasswordResetData {
  resetToken: string;
  newPassword: string;
}

export interface ProfileUpdateData {
  userId: number;
  name: string;
}

// Role related types
export interface Role {
  id: number;
  name: string;
  description?: string;
  parentRoleId?: number;
  parentRole?: Role;
  childRoles?: Role[];
  permissions: Permission[];
}

export interface RoleWithDetails extends Role {
  permissions: Permission[];
  users: User[];
}

export interface RoleCreationData {
  name: string;
  description?: string;
  parentRoleId?: number;
}

// Permission related types
export interface Permission {
  id: number;
  name: string;
  description: string;
  scope: string;
}

export interface PermissionWithRoles extends Permission {
  roles: Array<{ roleId: number }>;
}

export interface PermissionCreationData {
  name: string;
  description: string;
  scope: string;
}

// API response types
export interface MessageResponse {
  message: string;
}

// API functions (these can be implemented later with actual API calls)
export interface API {
  // User related functions
  registerUser: (data: RegistrationData) => Promise<User>;
  loginUser: (credentials: LoginCredentials) => Promise<User>;
  logoutUser: () => Promise<MessageResponse>;
  changePassword: (data: PasswordChangeData) => Promise<MessageResponse>;
  requestPasswordReset: (
    data: PasswordResetRequestData
  ) => Promise<MessageResponse>;
  resetPassword: (data: PasswordResetData) => Promise<MessageResponse>;
  updateProfile: (data: ProfileUpdateData) => Promise<User>;
  getAllUsers: () => Promise<UserWithRoles[]>;
  getUser: (id: number) => Promise<UserWithRoles>;
  deleteUser: (id: number) => Promise<MessageResponse>;
  assignRoleToUser: (
    userId: number,
    roleId: number
  ) => Promise<MessageResponse>;
  removeRoleFromUser: (
    userId: number,
    roleId: number
  ) => Promise<MessageResponse>;

  // Role related functions
  createRole: (data: RoleCreationData) => Promise<Role>;
  getAllRoles: () => Promise<Role[]>;
  getRole: (id: number) => Promise<RoleWithDetails>;
  updateRole: (id: number, data: { name: string }) => Promise<Role>;
  deleteRole: (id: number) => Promise<MessageResponse>;
  assignPermissionToRole: (
    roleId: number,
    permissionId: number
  ) => Promise<MessageResponse>;
  removePermissionFromRole: (
    roleId: number,
    permissionId: number
  ) => Promise<MessageResponse>;

  // Permission related functions
  createPermission: (data: PermissionCreationData) => Promise<Permission>;
  getAllPermissions: () => Promise<Permission[]>;
  getPermission: (id: number) => Promise<PermissionWithRoles>;
  updatePermission: (id: number, data: { name: string }) => Promise<Permission>;
  deletePermission: (id: number) => Promise<MessageResponse>;
}