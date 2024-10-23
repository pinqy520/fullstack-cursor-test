import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import routes from "./routes";
import fastifyStatic from "@fastify/static";
import path from "path";
import { authMiddleware } from "./middlewares/authMiddleware";

const prisma = new PrismaClient();
const fastify = Fastify({
  logger: true, // 保留 Fastify 的内置日志，这对生产环境的调试很有帮助
});

// 注册 API 路由
fastify.register(routes, { prefix: "/api" });

// 注册静态文件插件
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "../../frontend/dist"),
  prefix: "/", // 可以通过 / 访问静态文件
});

// 添加一个通配符路由，将所有不匹配的请求重定向到 index.html
fastify.setNotFoundHandler((request, reply) => {
  if (request.url.startsWith("/api")) {
    reply.status(404).send({ error: "API route not found" });
  } else {
    reply.sendFile("index.html");
  }
});

// 定义不需要身份验证的路由
const publicRoutes = [
  "/api/users/register",
  "/api/users/login",
  "/api/users/forgot-password",
  "/api/users/reset-password",
];

// 注册全局中间件，但排除公共路由
fastify.addHook("preHandler", (request, reply, done) => {
  if (request.url.startsWith("/api/") && !publicRoutes.includes(request.url)) {
    authMiddleware(request, reply, done);
  } else {
    done();
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server is now listening on http://localhost:3001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
