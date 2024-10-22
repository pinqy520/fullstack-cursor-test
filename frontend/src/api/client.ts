import axios from "axios";
import type {
  API,
  User,
  UserWithRoles,
  Role,
  RoleWithDetails,
  Permission,
  PermissionWithRoles,
  MessageResponse,
  LoginResponse,
} from "../types/api";

const BASE_URL = "/api"; // 确保这个URL与你的后端服务器地址匹配

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const apiClient: API = {
  // User related functions
  registerUser: async (data) => {
    const response = await axiosInstance.post<User>(`/users/register`, data);
    return response.data;
  },

  loginUser: async (credentials) => {
    const response = await axiosInstance.post<LoginResponse>(
      `/users/login`,
      credentials
    );
    return response.data;
  },
  
  logoutUser: async () => {
    const response = await axiosInstance.post<MessageResponse>(
      `/users/logout`
    );
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axiosInstance.put<MessageResponse>(
      `/users/change-password`,
      data
    );
    return response.data;
  },

  requestPasswordReset: async (data) => {
    const response = await axiosInstance.post<MessageResponse>(
      `/users/forgot-password`,
      data
    );
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axiosInstance.put<MessageResponse>(
      `/users/reset-password`,
      data
    );
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put<User>(
      `/users/update-profile`,
      data
    );
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axiosInstance.get<UserWithRoles[]>(`/users`);
    return response.data;
  },

  getUser: async (id) => {
    const response = await axiosInstance.get<UserWithRoles>(`/users/${id}`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axiosInstance.delete<MessageResponse>(
      `/users/${id}`
    );
    return response.data;
  },

  assignRoleToUser: async (userId, roleId) => {
    const response = await axiosInstance.post<MessageResponse>(
      `/users/${userId}/roles/${roleId}`
    );
    return response.data;
  },

  removeRoleFromUser: async (userId, roleId) => {
    const response = await axiosInstance.delete<MessageResponse>(
      `/users/${userId}/roles/${roleId}`
    );
    return response.data;
  },

  // Role related functions
  createRole: async (data) => {
    const response = await axiosInstance.post<Role>(`/roles`, data);
    return response.data;
  },

  getAllRoles: async () => {
    const response = await axiosInstance.get<Role[]>(`/roles`);
    return response.data;
  },

  getRole: async (id) => {
    const response = await axiosInstance.get<RoleWithDetails>(
      `/roles/${id}`
    );
    return response.data;
  },

  updateRole: async (id, data) => {
    const response = await axiosInstance.put<Role>(`/roles/${id}`, data);
    return response.data;
  },

  deleteRole: async (id) => {
    const response = await axiosInstance.delete<MessageResponse>(
      `/roles/${id}`
    );
    return response.data;
  },

  assignPermissionToRole: async (roleId, permissionId) => {
    const response = await axiosInstance.post<MessageResponse>(
      `/roles/${roleId}/permissions/${permissionId}`
    );
    return response.data;
  },

  removePermissionFromRole: async (roleId, permissionId) => {
    const response = await axiosInstance.delete<MessageResponse>(
      `/roles/${roleId}/permissions/${permissionId}`
    );
    return response.data;
  },

  // Permission related functions
  createPermission: async (data) => {
    const response = await axiosInstance.post<Permission>(
      `/permissions`,
      data
    );
    return response.data;
  },

  getAllPermissions: async () => {
    const response = await axiosInstance.get<Permission[]>(`/permissions`);
    return response.data;
  },

  getPermission: async (id) => {
    const response = await axiosInstance.get<PermissionWithRoles>(
      `/permissions/${id}`
    );
    return response.data;
  },

  updatePermission: async (id, data) => {
    const response = await axiosInstance.put<Permission>(
      `/permissions/${id}`,
      data
    );
    return response.data;
  },

  deletePermission: async (id) => {
    const response = await axiosInstance.delete<MessageResponse>(
      `/permissions/${id}`
    );
    return response.data;
  },
};

export default apiClient;
