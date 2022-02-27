const { User } = require('./databaseController');

const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

exports.indexPage = (req, res, next) => {
    res.render('index', { title: 'Express', email: req.user.email });
};

// GET request for creating an account
exports.registerGet = (req, res, next) => {
    res.status(200).render('register', { title: 'Register' });
}

// POST request for creating an account
exports.registerPost = [
    body('firstName', 'Empty name').trim().isLength({ min: 1 }).escape(),
    body('lastName', 'Empty last name').trim().isLength({ min: 1 }).escape(),
    body('email', 'Not an email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 8 characters in length').isLength({ min: 8 }).escape(),

    async (req, res, next) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ statusCode: 400, errors: errors });
            }

            const oldUser = await User.findOne({ where: { email: email } });

            if (oldUser) {
                return res.status(409).json({ statusCode: 409, message: 'User Already Exists. Please Login' });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                first_name: firstName,
                last_name: lastName,
                email: email.toLowerCase(),
                password: encryptedPassword 
            });

            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );
            res.cookie('token', token, { httpOnly: true });

            res.status(201).json(user);
        } catch (err) {
            console.log(err);
        }
    }
];

// GET request for loging into an existing account
exports.loginGet = (req, res, next) => {
    res.status(200).send('Page not yet created');
}

// POST request for loging into an existing account
exports.loginPost = [
    body('email', 'Not an email').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 8 characters in length').isLength({ min: 8 }).escape(),

    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ statusCode: 400, errors: errors });
            }

            const user = await User.findOne({ where: { email: email }});

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { user_id: user.id, email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    }
                );
                res.cookie('token', token, { httpOnly: true });

                return res.status(200).json(user);
            }

            return res.status(400).json({ statusCode: 400, errors: 'Invalid credentials' });
        } catch(err) {
            console.log(err);
        }
    }
];

// GET request for getting a user
exports.userGet = async (req, res, next) => {
    console.log(req.user);
    res.status(200).json({ statusCode: 200, user: req.user });
}