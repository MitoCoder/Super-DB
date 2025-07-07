import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Import API routes
import authRegister from './api/auth/register.js';
import authLogin from './api/auth/login.js';
import authUser from './api/auth/user.js';
import authLogout from './api/auth/logout.js';
import databases from './api/databases/index.js';
import databaseRecords from './api/databases/[key]/records.js';

// Auth routes
app.post('/api/auth/register', authRegister);
app.post('/api/auth/login', authLogin);
app.get('/api/auth/user', authUser);
app.post('/api/auth/logout', authLogout);

// Database routes
app.get('/api/databases', databases);
app.post('/api/databases', databases);

// Database records routes
app.get('/api/databases/:key/records', (req, res) => {
  req.query.key = req.params.key;
  databaseRecords(req, res);
});
app.post('/api/databases/:key/records', (req, res) => {
  req.query.key = req.params.key;
  databaseRecords(req, res);
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});