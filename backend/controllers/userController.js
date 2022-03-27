const { User } = require('./databaseController');

const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

// GET request for index page
exports.indexPage = (req, res, next) => {
    res.render('index', { title: 'Express', email: req.user.email });
}

// GET request for getting a user
exports.userGet = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.user.email }});

    req.user.balance = user.balance;

    const resUser = {
        balance: user.balance,
        name: user.name,
        email: user.email
    }

    res.status(200).json({ statusCode: 200, user: resUser });
}

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
                const error = [{
                    param: 'exists',
                    msg: 'User Already Exists. Please Login'
                }]
                return res.status(409).json({ statusCode: 409, errors: error });
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
            res.cookie('registered');

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
                res.cookie('registered');

                return res.status(200).json(user);
            }

            return res.status(400).json({ statusCode: 400, credentialError: 'Invalid credentials' });
        } catch(err) {
            console.log(err);
        }
    }
];

// POST request for logging out a user
exports.logoutPost = (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ statusCode: 200});
    } catch (err) {
        console.log(err);
    }
}