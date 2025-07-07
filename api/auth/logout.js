export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Clear the authentication cookie
    res.setHeader('Set-Cookie', [
      'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
    ]);

    res.json({ message: 'Logout realizado com sucesso' });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Erro ao fazer logout' });
  }
};