import jwt from 'jsonwebtoken';
import { users, databases } from '../../shared/storage.js';

// Authentication middleware
function authenticate(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    throw new Error('No authentication cookie');
  }

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {});

  const token = cookies.token;
  if (!token) {
    throw new Error('No authentication token');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  return decoded.userId;
}

export default async (req, res) => {
  try {
    const userId = authenticate(req);

    if (req.method === 'GET') {
      // Get all databases for user
      const userDatabases = [];
      for (const [key, database] of databases.entries()) {
        if (database.userId === userId) {
          userDatabases.push(database);
        }
      }
      return res.json(userDatabases);
    }

    if (req.method === 'POST') {
      // Create new database
      const { name } = req.body;
      
      if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Nome do banco de dados é obrigatório' });
      }

      const databaseKey = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_db_${Date.now()}`;
      const database = {
        id: Date.now(),
        userId,
        name: name.trim(),
        key: databaseKey,
        createdAt: new Date()
      };

      databases.set(databaseKey, database);
      return res.status(201).json(database);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Database API error:', error);
    if (error.message.includes('authentication') || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Não autorizado - Faça login' });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};