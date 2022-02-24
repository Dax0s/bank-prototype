const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.cookies.token;

    console.log(`Cookie: ${req.cookies.token}`);

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
    } catch (err) {
        console.log(err);
        res.status(401).send('Invalid Token');
    }

    return next();
};