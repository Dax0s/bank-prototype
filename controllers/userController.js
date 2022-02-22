const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./databaseController');

exports.registerGet = (req, res, next) => {
    res.status(200).send('Page not yet created');
}

exports.registerPost = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

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
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        );
        console.log(token);
        user.token = token;

        await user.save();

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

exports.loginGet = (req, res, next) => {
    res.status(200).send('Page not yet created');
}

exports.loginPost = (req, res, next) => {
    res.status(200).send('Page not yet created');
}