const crypto = require('crypto');
const secretKey = 'maleslodkiekotkipilnujabackendu1'; //this has to be 32 bytes
const tokenExpiration = 3600;

function createToken(user) {
    const payload = {
        user_email: user.user_email,
        user_permissions: user.user_permissions,
        exp: Math.floor(Date.now() / 1000) + tokenExpiration,
    };

    const payloadString = JSON.stringify(payload);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(payloadString, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const token = iv.toString('base64') + ':' + encrypted;

    return token;
}

function verifyToken(token) {
    console.log(token)
    const [ivString, encryptedPayload] = token.split(':');
    console.log(ivString)
    const iv = Buffer.from(ivString, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedPayload, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    const tokenPayload = JSON.parse(decrypted);

    if (tokenPayload.exp <= Math.floor(Date.now() / 1000)) {
        return null;
    }

    return tokenPayload;
}

module.exports = { createToken, verifyToken };