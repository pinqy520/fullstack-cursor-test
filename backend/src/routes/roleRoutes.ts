import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function roleRoutes(fastify: FastifyInstance) {
  // 创建角色
  fastify.post('/', async (request, reply) => {
    const { name } = request.body as { name: string }
    const role = await prisma.role.create({ data: { name } })
    reply.send(role)
  })

  // 获取所有角色
  fastify.get('/', async (request, reply) => {
    const roles = await prisma.role.findMany({
      include: { permissions: true, users: { select: { id: true, email: true, name: true } } }
    })
    reply.send(roles)
  })

  // 获取单个角色
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id) },
      include: { permissions: true, users: { select: { id: true, email: true, name: true } } }
    })
    if (!role) {
      reply.status(404).send({ error: 'Role not found' })
      return
    }
    reply.send(role)
  })

  // 更新角色
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { name } = request.body as { name: string }
    const role = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { name }
    })
    reply.send(role)
  })

  // 删除角色
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    await prisma.role.delete({ where: { id: parseInt(id) } })
    reply.send({ message: 'Role deleted successfully' })
  })

  // 为角色分配权限
  fastify.post('/:roleId/permissions/:permissionId', async (request, reply) => {
    const { roleId, permissionId } = request.params as { roleId: string, permissionId: string }
    await prisma.role.update({
      where: { id: parseInt(roleId) },
      data: { permissions: { connect: { id: parseInt(permissionId) } } }
    })
    reply.send({ message: 'Permission assigned to role successfully' })
  })

  // 从角色移除权限
  fastify.delete('/:roleId/permissions/:permissionId', async (request, reply) => {
    const { roleId, permissionId } = request.params as { roleId: string, permissionId: string }
    await prisma.role.update({
      where: { id: parseInt(roleId) },
      data: { permissions: { disconnect: { id: parseInt(permissionId) } } }
    })
    reply.send({ message: 'Permission removed from role successfully' })
  })
}
