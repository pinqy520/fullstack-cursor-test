## 开始使用

1. 安装依赖：
   ```
   pnpm install
   ```

2. 初始化数据库（在 backend 目录中）：
   ```
   cd backend
   pnpm prisma migrate dev --name init
   pnpm db:seed
   cd ..
   ```

3. 启动开发服务器：
   ```
   pnpm dev
   ```
   这将同时启动前端（http://localhost:3000）和后端（http://localhost:3001）服务器。

4. 构建项目：
   ```
   pnpm build
   ```

## 开发

在开发过程中，你需要同时运行前端和后端服务器：

1. 启动后端服务器：
   ```
   cd backend
   pnpm dev
   ```

2. 在另一个终端窗口，启动前端开发服务器：
   ```
   cd frontend
   pnpm dev
   ```

前端开发服务器将在 http://localhost:3000 上运行，并将 API 请求代理到 http://localhost:3001。

## 生产部署

1. 构建前端：
   ```
   cd frontend
   pnpm build
   cd ..
   ```

2. 构建后端：
   ```
   cd backend
   pnpm build
   cd ..
   ```

3. 启动生产服务器：
   ```
   cd backend
   pnpm start
   ```

在生产环境中，服务器将在 http://localhost:3001 上运行，同时提供 API 服务和前端静态文件。

## 功能

- 用户管理：注册、登录、查看用户列表、创建新用户
- 角色管理：查看角色列表、创建新角色
- 权限管理：查看权限列表、创建新权限

## 贡献

欢迎提交 Pull Requests 来改进这个项目。在提交之前，请确保你的代码符合项目的编码规范并通过所有测试。

## 许可证

ISC