import jwt from 'jsonwebtoken';
import { databases, records } from '../../../shared/storage.js';

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

function verifyDatabaseAccess(databaseKey, userId) {
  const database = databases.get(databaseKey);
  if (!database || database.userId !== userId) {
    throw new Error('Database not found or access denied');
  }
  return database;
}

export default async (req, res) => {
  try {
    const userId = authenticate(req);
    const databaseKey = req.query.key;

    if (!databaseKey) {
      return res.status(400).json({ message: 'Database key is required' });
    }

    // Verify user has access to this database
    verifyDatabaseAccess(databaseKey, userId);

    if (req.method === 'GET') {
      // Get all records for database
      const databaseRecords = records.get(databaseKey) || [];
      return res.json(databaseRecords);
    }

    if (req.method === 'POST') {
      // Create new record
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'Dados do registro são obrigatórios' });
      }

      const record = {
        id: Date.now(),
        databaseKey,
        data,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const databaseRecords = records.get(databaseKey) || [];
      databaseRecords.push(record);
      records.set(databaseKey, databaseRecords);

      return res.status(201).json(record);
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Records API error:', error);
    if (error.message.includes('authentication') || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Não autorizado - Faça login' });
    }
    if (error.message.includes('Database not found')) {
      return res.status(404).json({ message: 'Banco de dados não encontrado' });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};