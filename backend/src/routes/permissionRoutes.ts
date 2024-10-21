import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function permissionRoutes(fastify: FastifyInstance) {
  // 创建权限
  fastify.post('/', async (request, reply) => {
    const { name } = request.body as { name: string }
    const permission = await prisma.permission.create({ data: { name } })
    reply.send(permission)
  })

  // 获取所有权限
  fastify.get('/', async (request, reply) => {
    const permissions = await prisma.permission.findMany({
      include: { roles: true }
    })
    reply.send(permissions)
  })

  // 获取单个权限
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const permission = await prisma.permission.findUnique({
      where: { id: parseInt(id) },
      include: { roles: true }
    })
    if (!permission) {
      reply.status(404).send({ error: 'Permission not found' })
      return
    }
    reply.send(permission)
  })

  // 更新权限
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { name } = request.body as { name: string }
    const permission = await prisma.permission.update({
      where: { id: parseInt(id) },
      data: { name }
    })
    reply.send(permission)
  })

  // 删除权限
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    await prisma.permission.delete({ where: { id: parseInt(id) } })
    reply.send({ message: 'Permission deleted successfully' })
  })
}
