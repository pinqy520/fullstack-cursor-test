import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建一些初始用户
  const userEmail = 'user1@example.com'
  const user1 = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      password: 'password123', // 注意：在实际应用中，应该使用哈希密码
      name: 'User One',
    },
  })

  // 创建一些初始角色
  const adminRoleName = 'Admin'
  const adminRole = await prisma.role.upsert({
    where: { name: adminRoleName },
    update: {},
    create: {
      name: adminRoleName,
    },
  })

  // 创建一些初始权限
  const readPermissionName = 'Read'
  const readPermission = await prisma.permission.upsert({
    where: { name: readPermissionName },
    update: {},
    create: {
      name: readPermissionName,
    },
  })

  console.log({ user1, adminRole, readPermission })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
