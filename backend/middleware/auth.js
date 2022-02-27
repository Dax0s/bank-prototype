const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.cookies.token;

    if (!token) {
        return res.status(401).json({ statusCode: 401, message: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
    } catch (err) {
        console.log(err);
        return res.status(401).json({ statusCode: 401, message: err });
    }

    return next();
};