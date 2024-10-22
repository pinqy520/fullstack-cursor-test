import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const prisma = new PrismaClient();

export class UserService {
  // ... 其他方法

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    // 移除密码字段，不应该在 token 中包含密码
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  generateToken(user: { id: number; email: string }) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (user) {
      const token = this.generateToken({ id: user.id, email: user.email });
      return { user, token };
    }
    return null;
  }
}
