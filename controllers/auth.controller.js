const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require("../models/User.model");

const signToken = (user) => {
    const expiresIn = process.env.JWT_EXPIRES_IN || "2h"; // day
    const jwtSecret = process.env.JWT_SECRET || '123456';
    return jwt.sign({...user}, jwtSecret, {
            expiresIn: expiresIn,
        }
    );
};

const createSendToken = (user, statusCode, req, res) => {
    const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || 1;
    const token = signToken(user);
    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + jwtCookieExpiresIn * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user
    });
}

const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    // 1) Check if username and password exist
    if (!email || !password) {
        res.status(401).json({
            status: 'failed',
            message: "Please provide username and password!"
        });
    }
    // 2) Check if user exists && password is correct
    const user = await User.query().findOne({
        email
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            status: 'failed',
            message: "Incorrect username or password!"
        });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
};

const logout = (req, res) => {
    const token = req.header('auth-token');
    if (!token)  return res.status(401).send('Already logged out');

    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success',
        message: "You are logged out"
    });
};

module.exports = {
    login,
    logout
}


