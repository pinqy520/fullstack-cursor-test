import { FastifyInstance } from 'fastify'
import { userRoutes } from './userRoutes'
import { roleRoutes } from './roleRoutes'
import { permissionRoutes } from './permissionRoutes'

export async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: '/users' })
  fastify.register(roleRoutes, { prefix: '/roles' })
  fastify.register(permissionRoutes, { prefix: '/permissions' })
}
