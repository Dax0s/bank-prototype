const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.cookies.token;

    if (!token) {
        return res.status(403).redirect('/users/register');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = decoded;
    } catch (err) {
        console.log(err);
        return res.status(401).redirect('/users/register');
        return res.status(401).send('Invalid Token');
    }

    return next();
};