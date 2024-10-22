import axios from "axios";
import {
  API,
  User,
  UserWithRoles,
  Role,
  RoleWithDetails,
  Permission,
  PermissionWithRoles,
  MessageResponse,
} from "../types/api";

const BASE_URL = "/api"; // 确保这个URL与你的后端服务器地址匹配

const apiClient: API = {
  // User related functions
  registerUser: async (data) => {
    const response = await axios.post<User>(`${BASE_URL}/users/register`, data);
    return response.data;
  },

  loginUser: async (credentials) => {
    const response = await axios.post<User>(
      `${BASE_URL}/users/login`,
      credentials
    );
    return response.data;
  },

  logoutUser: async () => {
    const response = await axios.post<MessageResponse>(
      `${BASE_URL}/users/logout`
    );
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axios.put<MessageResponse>(
      `${BASE_URL}/users/change-password`,
      data
    );
    return response.data;
  },

  requestPasswordReset: async (data) => {
    const response = await axios.post<MessageResponse>(
      `${BASE_URL}/users/forgot-password`,
      data
    );
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axios.put<MessageResponse>(
      `${BASE_URL}/users/reset-password`,
      data
    );
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axios.put<User>(
      `${BASE_URL}/users/update-profile`,
      data
    );
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get<UserWithRoles[]>(`${BASE_URL}/users`);
    return response.data;
  },

  getUser: async (id) => {
    const response = await axios.get<UserWithRoles>(`${BASE_URL}/users/${id}`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete<MessageResponse>(
      `${BASE_URL}/users/${id}`
    );
    return response.data;
  },

  assignRoleToUser: async (userId, roleId) => {
    const response = await axios.post<MessageResponse>(
      `${BASE_URL}/users/${userId}/roles/${roleId}`
    );
    return response.data;
  },

  removeRoleFromUser: async (userId, roleId) => {
    const response = await axios.delete<MessageResponse>(
      `${BASE_URL}/users/${userId}/roles/${roleId}`
    );
    return response.data;
  },

  // Role related functions
  createRole: async (data) => {
    const response = await axios.post<Role>(`${BASE_URL}/roles`, data);
    return response.data;
  },

  getAllRoles: async () => {
    const response = await axios.get<Role[]>(`${BASE_URL}/roles`);
    return response.data;
  },

  getRole: async (id) => {
    const response = await axios.get<RoleWithDetails>(
      `${BASE_URL}/roles/${id}`
    );
    return response.data;
  },

  updateRole: async (id, data) => {
    const response = await axios.put<Role>(`${BASE_URL}/roles/${id}`, data);
    return response.data;
  },

  deleteRole: async (id) => {
    const response = await axios.delete<MessageResponse>(
      `${BASE_URL}/roles/${id}`
    );
    return response.data;
  },

  assignPermissionToRole: async (roleId, permissionId) => {
    const response = await axios.post<MessageResponse>(
      `${BASE_URL}/roles/${roleId}/permissions/${permissionId}`
    );
    return response.data;
  },

  removePermissionFromRole: async (roleId, permissionId) => {
    const response = await axios.delete<MessageResponse>(
      `${BASE_URL}/roles/${roleId}/permissions/${permissionId}`
    );
    return response.data;
  },

  // Permission related functions
  createPermission: async (data) => {
    const response = await axios.post<Permission>(
      `${BASE_URL}/permissions`,
      data
    );
    return response.data;
  },

  getAllPermissions: async () => {
    const response = await axios.get<Permission[]>(`${BASE_URL}/permissions`);
    return response.data;
  },

  getPermission: async (id) => {
    const response = await axios.get<PermissionWithRoles>(
      `${BASE_URL}/permissions/${id}`
    );
    return response.data;
  },

  updatePermission: async (id, data) => {
    const response = await axios.put<Permission>(
      `${BASE_URL}/permissions/${id}`,
      data
    );
    return response.data;
  },

  deletePermission: async (id) => {
    const response = await axios.delete<MessageResponse>(
      `${BASE_URL}/permissions/${id}`
    );
    return response.data;
  },
};

export default apiClient;
