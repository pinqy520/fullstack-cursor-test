import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { UserService } from '../services/UserService';

const prisma = new PrismaClient();
const userService = new UserService();

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/register", { preHandler: (req, res, done) => done() }, async (request, reply) => {
    const { email, password, name } = request.body as any;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    reply.send({ id: user.id, email: user.email, name: user.name });
  });

  fastify.post("/login", { preHandler: (req, res, done) => done() }, async (request, reply) => {
    const { email, password } = request.body as any;
    const result = await userService.login(email, password);
    if (result) {
      reply.send({ user: result.user, token: result.token });
    } else {
      reply.status(401).send({ error: "Invalid credentials" });
    }
  });

  fastify.post("/logout", async (request, reply) => {
    // Implement logout logic (e.g., invalidate token)
    reply.send({ message: "Logged out successfully" });
  });

  fastify.put("/change-password", async (request, reply) => {
    const { userId, oldPassword, newPassword } = request.body as any;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      reply.status(401).send({ error: "Invalid password" });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    reply.send({ message: "Password changed successfully" });
  });

  fastify.post("/forgot-password", async (request, reply) => {
    const { email } = request.body as { email: string };
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }
    const resetToken = uuidv4();
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    });
    // TODO: Send email with reset token
    reply.send({ message: "Password reset email sent" });
  });

  fastify.put("/reset-password", async (request, reply) => {
    const { resetToken, newPassword } = request.body as {
      resetToken: string;
      newPassword: string;
    };
    const user = await prisma.user.findFirst({
      where: {
        resetToken,
        resetTokenExpires: { gt: new Date() },
      },
    });
    if (!user) {
      reply.status(400).send({ error: "Invalid or expired reset token" });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
    reply.send({ message: "Password reset successfully" });
  });

  fastify.put("/update-profile", async (request, reply) => {
    const { userId, name } = request.body as any;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });
    reply.send({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    });
  });

  // 获取所有用户
  fastify.get("/", async (request, reply) => {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, roles: true },
    });
    reply.send(users);
  });

  // 获取单个用户
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, email: true, name: true, roles: true },
    });
    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }
    reply.send(user);
  });

  // 删除用户
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.user.delete({ where: { id: parseInt(id) } });
    reply.send({ message: "User deleted successfully" });
  });

  // 为用户分配角色
  fastify.post("/:userId/roles/:roleId", async (request, reply) => {
    const { userId, roleId } = request.params as {
      userId: string;
      roleId: string;
    };
    await prisma.userRole.create({
      data: { userId: parseInt(userId), roleId: parseInt(roleId) },
    });
    reply.send({ message: "Role assigned to user successfully" });
  });

  // 从用户移除角色
  fastify.delete("/:userId/roles/:roleId", async (request, reply) => {
    const { userId, roleId } = request.params as {
      userId: string;
      roleId: string;
    };
    await prisma.userRole.deleteMany({
      where: { userId: parseInt(userId), roleId: parseInt(roleId) },
    });
    reply.send({ message: "Role removed from user successfully" });
  });
}
