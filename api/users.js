const express = require('express');
const usersRouter = express.Router();
//MIDDLEWARE
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
//READ JWT
const {
    createUser,
    getUserByUsername,
    getUser 
} = require ('../db');
const { requireUser } = require('./utils');


usersRouter.use((req, res, next) => {
    console.log(req.body);
    
    next();
    });



// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password){
        next({
            name: "Missing Credentials",
            message: "Please input username and password"
        });
    }
    try{
        const user = await getUserByUsername(username);
        const userHash = await getUser({username,password})
        if (user && user.password == password){
            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET);
            
            res.send({
                user,
                token: token,
                message: "you're logged in!"
            });
            
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    }catch(error){
        console.log(error);
        next(error)
    }
    
});


// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
        
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'username already exists'
        });
      }
      if (password.length < 4){
          next({
              name: "PasswordLengthError", 
              message: "Password Too Short!",
              error: "Password Too Short!"
          });
      } 
  
      const user = await createUser({
        username,
        password
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET);
  
      res.send({ 
        user:user,
        message: "thank you for registering",
        token:token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });
  

  // GET /api/users/:username/creatures
usersRouter.get("/:username/creatures", async (req, res, next)=>{
    const username = req.params;

    try {
        const routines = await getAllCreaturesByUser(username);

        if (creatures) {
            res.send(creatures);
        } else {
            next ({name: "NoRoutinesError",
                   message: "Error, no routines for that user"});
        }
    } catch ({name, message}) {
        console.log("There's an error???");
        next({name, message});
    }
});


module.exports = usersRouter;