import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    id: number;
    email: string;
  };
}

export function authMiddleware(request: AuthenticatedRequest, reply: FastifyReply, done: (err?: Error) => void) {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      reply.status(401).send({ error: 'No token provided' });
      return done();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    request.user = decoded;
    done();
  } catch (error) {
    reply.status(401).send({ error: 'Invalid token' });
    done();
  }
}
