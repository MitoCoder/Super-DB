import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../../shared/storage.js';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password, confirmPassword, firstName, lastName, email } = req.body;

    // Validation
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
    }

    // Check if user already exists
    for (const user of users.values()) {
      if (user.username === username) {
        return res.status(400).json({ message: 'Nome de usuário já existe' });
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const userId = uuidv4();
    const user = {
      id: userId,
      username,
      email: email || null,
      firstName: firstName || null,
      lastName: lastName || null,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.set(userId, user);

    // Return user data (without password)
    const { passwordHash: _, ...userResponse } = user;
    res.status(201).json(userResponse);

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};