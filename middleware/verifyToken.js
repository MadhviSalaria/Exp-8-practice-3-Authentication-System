const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mySecretKey';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded; // Attach payload (includes role)
        next();
    });
}

module.exports = verifyToken;
