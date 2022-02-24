const { User } = require('./databaseController');

const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.indexPage = (req, res, next) => {
    res.render('index', { title: 'Express', email: req.user.email });
};

// GET request for creating an account
exports.registerGet = (req, res, next) => {
    res.status(200).render('register', { title: 'Register' });
}

// POST request for creating an account
exports.registerPost = async (req, res, next) => {
    try {
        let { firstName, lastName, email, password } = req.body;

        firstName = 'none';
        lastName = 'none';

        if (!(firstName && lastName && email && password)) {
            res.status(400).send('All inputs are required');
        }

        const oldUser = await User.findOne({ where: { email: email } });

        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
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

// GET request for loging into an existing account
exports.loginGet = (req, res, next) => {
    res.status(200).send('Page not yet created');
}

// POST request for loging into an existing account
exports.loginPost = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('All input is required');
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

        res.status(400).send('Invalid credentials');
    } catch(err) {
        console.log(err);
    }
}
