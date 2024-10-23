# 项目上下文总结

## 项目概述

这是一个全栈 TypeScript 项目，包含前端 React 应用和后端 Fastify 服务器。项目实现了用户认证、角色管理和权限控制等功能。

## 主要组件

### 前端 (frontend/)

1. **App (App.tsx)**

   - 使用 React Router 进行路由管理
   - 包含 AuthProvider 和主要路由结构
   - 实现了公共路由和受保护路由的区分

2. **AuthContext (contexts/AuthContext.tsx)**

   - 提供全局认证状态管理
   - 实现登录、注销功能
   - 在本地存储中保存用户信息和 token
   - 处理认证错误，自动重定向到登录页面

3. **API Client (api/client.ts)**

   - 使用 axios 实例处理 API 请求
   - 实现请求拦截器，自动添加认证 token
   - 实现响应拦截器，处理认证错误
   - 封装所有 API 调用

4. **组件**
   - Login: 用户登录界面
   - Register: 用户注册界面
   - Dashboard: 主面板
   - UserManagement: 用户管理界面
   - RoleManagement: 角色管理界面
   - PermissionManagement: 权限管理界面
   - Navigation: 导航栏组件
   - PrivateRoute: 用于保护需要认证的路由

### 后端 (backend/)

1. **主服务器 (index.ts)**

   - 配置 Fastify 服务器
   - 注册路由和中间件
   - 实现公共路由和受保护路由的区分

2. **认证中间件 (middlewares/authMiddleware.ts)**

   - 验证请求中的 JWT token
   - 将解码后的用户信息添加到请求对象

3. **用户路由 (routes/userRoutes.ts)**

   - 实现用户相关的 API 端点
   - 包括注册、登录、密码重置等功能

4. **用户服务 (services/UserService.ts)**
   - 处理用户认证和 token 生成逻辑

## 最近的变更

1. 重构了 App.tsx，将路由逻辑封装在 AppContent 组件中。
2. 更新了 AuthProvider，现在通过 props 接收 navigate 函数，解决了 useNavigate 的上下文问题。
3. 实现了自动处理认证错误的机制，当收到 401 错误时，会自动清除 token 并重定向到登录页面。
4. 添加了用户注册功能和相应的路由。

## 待办事项

1. 完善后端的错误处理和日志记录。
2. 实现更细粒度的权限控制。
3. 添加单元测试和集成测试。
4. 优化前端状态管理，考虑使用 Redux 或 MobX。
5. 实现用户密码重置功能。

## 注意事项

- 确保在生产环境中使用安全的 JWT_SECRET。
- 定期审查和更新依赖包，以修复潜在的安全漏洞。
- 考虑实现 token 刷新机制，以增强安全性。
- 在部署前，确保移除所有硬编码的敏感信息（如数据库连接字符串）。
