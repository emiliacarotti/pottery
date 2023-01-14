const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsername
} = require('../db/user');
const { requireUser } = require('./utils');

usersRouter.use((req, res, next) => {
    console.log(req.body);

    next();
});

// GET /api/users/admin
usersRouter.get("/", async (req, res, next) => {

    try {
        const users = await getAllUsers();
        res.send(users);

    } catch (error) {
        console.error(error)
    }
});

// GET /api/users/myprofile
usersRouter.get('/myprofile/:userid', async (req, res, next) => {

    try {
        console.log(req.params.userid)
        const user = await getUserById(req.params.userid);
        console.log(user)
        res.send(user);

    } catch (error) {
        console.log(error);
        next(error)
    }
})

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {

    const { username, password } = req.body;
    if (!username || !password) {
        next({
            error: "MissingCredentialsError",
            message: "Please input username and password",
            name: "Missing Credentials"
        });
    }

    try {
        const user = await getUserByUsername(username);
        console.log("log in user", user)
        if (user && user.password == password) {
            const token = jwt.sign({
                userid: user.userid,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            console.log("this is token", token)
            delete user.password
            res.send({
                user,
                token: token,
                message: "you're logged in!"
            });

        } else {
            next({
                error: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect',
                name: 'IncorrectCredentialsError'
            });
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
});

// Create user
//POST api/users/register
usersRouter.post("/register", async (req, res, next) => {
    const { username, password, isAdmin } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({
                error: "userExistsError",
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }

        const user = await createUser({
            username,
            password,
            isAdmin
        });
        res.send(user);

    } catch (error) {
        console.error(error)
    }
});

// Export Users Router
module.exports = usersRouter;