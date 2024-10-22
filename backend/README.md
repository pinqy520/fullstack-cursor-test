# Backend Implementation Changes

## 数据模型更新 (schema.prisma)

- 在 `User` 模型中添加了 `resetToken` 和 `resetTokenExpires` 字段，用于密码重置功能。
- 实现了 `Role`、`Permission`、`UserRole` 和 `RolePermission` 模型，支持角色和权限管理。
- 添加了角色继承关系，允许角色有父角色和子角色。

## 路由结构 (routes/index.ts)

- 使用 Fastify 的插件系统组织路由
- 为用户、角色和权限路由设置了各自的前缀
  - 用户路由前缀: `/users`
  - 角色路由前缀: `/roles`
  - 权限路由前缀: `/permissions`

## 主应用文件 (index.ts)

- 使用 Fastify 作为 Web 服务器框架。
- 集成了 Prisma ORM 用于数据库操作。
- 注册了 API 路由，并设置了全局 `/api` 前缀。
- 配置了静态文件服务，用于服务前端构建文件。
- 实现了通配符路由，将不匹配的请求重定向到 index.html。

## API 接口

### 用户相关接口

- POST /api/users/register: 注册新用户
- POST /api/users/login: 用户登录
- POST /api/users/logout: 用户注销
- PUT /api/users/change-password: 更改密码
- POST /api/users/forgot-password: 请求密码重置
- PUT /api/users/reset-password: 重置密码
- PUT /api/users/update-profile: 更新用户资料
- GET /api/users: 获取所有用户
- GET /api/users/:id: 获取单个用户信息
- DELETE /api/users/:id: 删除用户
- POST /api/users/:userId/roles/:roleId: 为用户分配角色
- DELETE /api/users/:userId/roles/:roleId: 从用户移除角色

### 角色相关接口

- POST /api/roles: 创建新角色
- GET /api/roles: 获取所有角色
- GET /api/roles/:id: 获取单个角色信息
- PUT /api/roles/:id: 更新角色
- DELETE /api/roles/:id: 删除角色
- POST /api/roles/:roleId/permissions/:permissionId: 为角色分配权限
- DELETE /api/roles/:roleId/permissions/:permissionId: 从角色移除权限

### 权限相关接口

- POST /api/permissions: 创建新权限
- GET /api/permissions: 获取所有权限
- GET /api/permissions/:id: 获取单个权限信息
- PUT /api/permissions/:id: 更新权限
- DELETE /api/permissions/:id: 删除权限

## 安全性考虑

- 使用 bcrypt 进行密码哈希。
- 实现了基于令牌的密码重置机制。

## 下一步计划

- 实现 JWT 认证机制。
- 添加请求验证中间件。
- 实现更细粒度的权限控制。
- 优化错误处理和日志记录。
- 添加单元测试和集成测试。

注意：确保在部署前更新环境变量，特别是数据库连接字符串和任何敏感信息。
