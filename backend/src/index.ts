import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { routes } from './routes'
import fastifyStatic from '@fastify/static'
import path from 'path'

const prisma = new PrismaClient()
const server = fastify({
  logger: true  // 保留 Fastify 的内置日志，这对生产环境的调试很有帮助
})

// 注册 API 路由
server.register(routes, { prefix: '/api' })

// 注册静态文件插件
server.register(fastifyStatic, {
  root: path.join(__dirname, '../../frontend/dist'),
  prefix: '/', // 可以通过 / 访问静态文件
})

// 添加一个通配符路由，将所有不匹配的请求重定向到 index.html
server.setNotFoundHandler((request, reply) => {
  if (request.url.startsWith('/api')) {
    reply.status(404).send({ error: 'API route not found' })
  } else {
    reply.sendFile('index.html')
  }
})

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' })
    console.log('Server is now listening on http://localhost:3001')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
