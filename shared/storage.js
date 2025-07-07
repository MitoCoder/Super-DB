// Armazenamento em memória para usuários, bancos de dados e registros
export const users = new Map();
export const databases = new Map();
export const records = new Map(); // key: databaseKey, value: array of records
export const sessions = new Map(); // key: sessionId, value: userId

console.log('Storage module initialized - Pure JavaScript');