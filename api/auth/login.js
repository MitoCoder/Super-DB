import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../../shared/storage.js';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
    }

    // Find user by username
    let user = null;
    for (const u of users.values()) {
      if (u.username === username) {
        user = u;
        break;
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', [
      `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ]);

    // Return user data (without password)
    const { passwordHash, ...userResponse } = user;
    res.json(userResponse);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};