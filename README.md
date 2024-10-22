# 全栈 TypeScript 项目

这是一个使用 TypeScript 开发的全栈 web 应用，包括前端和后端。

## 项目结构

本项目使用 pnpm 工作空间（workspace）来管理 monorepo 结构：

- `frontend/`: React 前端应用
- `backend/`: Fastify 后端应用

## 技术栈

- 前端：React, Semi Design, React Router
- 后端：Fastify, Prisma
- 数据库：SQLite

## 文件结构和说明

### 根目录

- `package.json`: 定义了整个项目的脚本和工作空间配置。
- `pnpm-workspace.yaml`: 定义了 pnpm 工作空间的结构。
- `.gitignore`: 指定了 Git 应该忽略的文件和目录。
- `README.md`: 项目说明文档（当前文件）。
- `README.dev.md`: 开发指南，包含项目设置和运行说明。

### 前端 (frontend/)

- `src/`
  - `main.tsx`: 应用的入口点，渲染根组件。
  - `App.tsx`: 主应用组件，包含路由配置和整体布局。
  - `components/`: 包含所有 React 组件。
    - `Login.tsx`: 登录页面组件。
    - `Register.tsx`: 注册页面组件。
    - `Dashboard.tsx`: 仪表板页面组件。
    - `UserManagement.tsx`: 用户管理页面组件。
    - `RoleManagement.tsx`: 角色管理页面组件。
    - `PermissionManagement.tsx`: 权限管理页面组件。
    - `Navigation.tsx`: 导航栏组件。
    - `PrivateRoute.tsx`: 用于保护需要认证的路由。
  - `contexts/`
    - `AuthContext.tsx`: 提供认证相关的上下文。
  - `api/`
    - `client.ts`: API 客户端，封装了与后端的通信逻辑。
  - `types/`
    - `api.ts`: 定义了 API 相关的类型和接口。
- `vite.config.ts`: Vite 配置文件，包含开发服务器和构建选项。
- `index.html`: HTML 入口文件。

### 后端 (backend/)

- `src/`
  - `index.ts`: 后端应用的入口点，设置 Fastify 服务器。
  - `routes/`: 包含所有 API 路由。
    - `index.ts`: 汇总并导出所有路由。
    - `userRoutes.ts`: 用户相关的 API 路由。
    - `roleRoutes.ts`: 角色相关的 API 路由。
    - `permissionRoutes.ts`: 权限相关的 API 路由。
  - `services/`: 包含业务逻辑服务。
    - `UserService.ts`: 处理用户相关的业务逻辑。
    - `RoleService.ts`: 处理角色相关的业务逻辑。
    - `PermissionService.ts`: 处理权限相关的业务逻辑。
  - `middlewares/`: 包含中间件。
    - `authMiddleware.ts`: 处理身份验证和授权。
- `prisma/`
  - `schema.prisma`: 定义数据库模型和关系。
  - `seed.ts`: 用于填充初始数据的脚本。
  - `migrations/`: 包含数据库迁移文件。
- `README.md`: 后端实现的变更说明和 API 接口文档。
- `package.json`: 定义后端依赖和脚本。
- `tsconfig.json`: TypeScript 配置文件。

## 主要功能

- 用户认证：注册、登录、注销
- 用户管理：查看用户列表、创建新用户、删除用户
- 角色管理：查看角色列表、创建新角色、删除角色
- 权限管理：查看权限列表、创建新权限、删除权限
- 路由保护：使用 PrivateRoute 组件保护需要认证的路由

## 认证机制

项目使用基于 token 的认证机制。AuthContext 提供了全局的认证状态管理，包括用户登录、注销功能。PrivateRoute 组件用于保护需要认证的路由，未登录用户会被重定向到登录页面。

## 开发指南

请参阅 `README.dev.md` 文件，了解如何设置开发环境、运行项目和部署应用。

## 贡献

欢迎提交 Pull Requests 来改进这个项目。在提交之前，请确保你的代码符合项目的编码规范并通过所有测试。

## 许可证

ISC
