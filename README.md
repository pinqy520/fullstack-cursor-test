# 全栈 TypeScript 项目

这是一个使用 TypeScript 开发的全栈 web 应用，包括前端和后端。

## 项目结构

本项目使用 pnpm 工作空间（workspace）来管理 monorepo 结构：

- `frontend/`: React 前端应用
- `backend/`: Fastify 后端应用

## 技术栈

- 前端：React, Vite, Semi Design
- 后端：Fastify, Prisma
- 数据库：SQLite

## 文件结构和说明

### 根目录

- `package.json`: 定义了整个项目的脚本和工作空间配置。
- `pnpm-workspace.yaml`: 定义了 pnpm 工作空间的结构。
- `.gitignore`: 指定了 Git 应该忽略的文件和目录。

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
  - `contexts/`
    - `AuthContext.tsx`: 提供身份验证上下文，管理用户登录状态。
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
- `prisma/`
  - `schema.prisma`: 定义数据库模型和关系。
  - `seed.ts`: 用于填充初始数据的脚本。

## 功能

- 用户管理：注册、登录、查看用户列表、创建新用户
- 角色管理：查看角色列表、创建新角色
- 权限管理：查看权限列表、创建新权限

