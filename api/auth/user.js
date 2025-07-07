import jwt from 'jsonwebtoken';
import { users } from '../../shared/storage.js';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get token from cookie
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      return res.status(401).json({ message: 'Não autorizado - Faça login' });
    }

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});

    const token = cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Não autorizado - Faça login' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get user from storage
    const user = users.get(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Return user data (without password)
    const { passwordHash, ...userResponse } = user;
    res.json(userResponse);

  } catch (error) {
    console.error('Get user error:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token inválido - Faça login novamente' });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};