//const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)
const crypto = '$ecRetK€y'

// Export config object
module.exports = {
  uri: 'mongodb+srv://svtech:$56oldNew@cluster0.0x9q0vu.mongodb.net/svtech', // Databse URI and database name
  secret: crypto, // Cryto-created secret
  db: 'svtech' // Database name
}