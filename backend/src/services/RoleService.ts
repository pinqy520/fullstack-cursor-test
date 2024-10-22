import { PrismaClient, Role, Permission } from "@prisma/client";

const prisma = new PrismaClient();

export type RoleWithPermissions = Role & {
  permissions: { permission: Permission }[];
  parentRole: Role | null;
  childRoles: Role[];
};

export class RoleService {
  async createRole(name: string, description?: string): Promise<Role> {
    return prisma.role.create({
      data: { name, description },
    });
  }

  async getAllRoles(): Promise<RoleWithPermissions[]> {
    return prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        parentRole: true,
        childRoles: true,
      },
    });
  }

  async getRole(id: number): Promise<RoleWithPermissions | null> {
    return prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        parentRole: true,
        childRoles: true,
      },
    });
  }

  async assignRoleToUser(userId: number, roleId: number): Promise<void> {
    await prisma.userRole.create({
      data: { userId, roleId },
    });
  }

  // 其他方法...
}
