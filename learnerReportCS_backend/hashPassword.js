// Script to hash a password using SHA-256 (no key, to match backend)
const crypto = require('crypto');

const password = 'dummyhash2';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log('Hashed password:', hash);
