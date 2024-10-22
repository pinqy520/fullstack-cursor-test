import { PrismaClient, Permission } from "@prisma/client";

const prisma = new PrismaClient();

export class PermissionService {
  async createPermission(
    name: string,
    description: string,
    scope: string
  ): Promise<Permission> {
    return prisma.permission.create({
      data: { name, description, scope },
    });
  }

  async getPermissions(): Promise<Permission[]> {
    return prisma.permission.findMany();
  }

  async assignPermissionToRole(
    roleId: number,
    permissionId: number
  ): Promise<void> {
    await prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  }

  // 其他方法...
}
