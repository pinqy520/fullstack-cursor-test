import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { RoleService, RoleWithPermissions } from "../services/RoleService";

const prisma = new PrismaClient();
const roleService = new RoleService();

export async function roleRoutes(fastify: FastifyInstance) {
  // 创建角色
  fastify.post<{ Body: { name: string; description?: string } }>(
    "/",
    async (request, reply) => {
      const { name, description } = request.body;
      const role = await roleService.createRole(name, description);
      reply.code(201).send(role);
    }
  );

  // 获取所有角色
  fastify.get("/", async (request, reply) => {
    const roles = await roleService.getAllRoles();
    const transformedRoles = roles.map((role: RoleWithPermissions) => ({
      ...role,
      permissions: role.permissions.map((rp) => rp.permission),
    }));
    reply.send(transformedRoles);
  });

  // 获取单个角色
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const role = await roleService.getRole(parseInt(id));
    if (!role) {
      reply.status(404).send({ error: "Role not found" });
      return;
    }
    const transformedRole = {
      ...role,
      permissions: role.permissions.map((rp) => rp.permission),
    };
    reply.send(transformedRole);
  });

  // 更新角色
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name } = request.body as { name: string };
    const role = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    reply.send(role);
  });

  // 删除角色
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.role.delete({ where: { id: parseInt(id) } });
    reply.send({ message: "Role deleted successfully" });
  });

  // 为角色分配权限
  fastify.post("/:roleId/permissions/:permissionId", async (request, reply) => {
    const { roleId, permissionId } = request.params as {
      roleId: string;
      permissionId: string;
    };
    try {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: parseInt(roleId),
            permissionId: parseInt(permissionId),
          },
        },
        update: {},
        create: {
          roleId: parseInt(roleId),
          permissionId: parseInt(permissionId),
        },
      });
      reply.send({ message: "Permission assigned to role successfully" });
    } catch (error) {
      console.error("Error assigning permission to role:", error);
      reply.status(500).send({ error: "Failed to assign permission to role" });
    }
  });

  // 从角色移除权限
  fastify.delete(
    "/:roleId/permissions/:permissionId",
    async (request, reply) => {
      const { roleId, permissionId } = request.params as {
        roleId: string;
        permissionId: string;
      };
      await prisma.rolePermission.deleteMany({
        where: {
          roleId: parseInt(roleId),
          permissionId: parseInt(permissionId),
        },
      });
      reply.send({ message: "Permission removed from role successfully" });
    }
  );
}
