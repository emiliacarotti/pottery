const express = require("express");
const apiRouter = express.Router();
const { getUserById } = require('../db');
//MIDDLEWARE
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
//READ JWT 
apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) { 
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});



apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

//SUBROUTERS
// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// // ROUTER: /api/address
const addressesRouter = require('./addresses');
apiRouter.use('/addresses', addressesRouter);

// ROUTER: /api/creatures
const creaturesRouter = require('./creatures');
apiRouter.use('/creatures', creaturesRouter);

// ROUTER: /api/cart
const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

// ROUTER: /api/history
const historyRouter = require('./history');
apiRouter.use('/history', historyRouter);

//ROUTER: ERROR
apiRouter.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
});

apiRouter.get('*', (req, res)=> {
    res.status(404).send({
        name: "PageNotFoundError",
        message: "Error, page not found!"
      });
});


module.exports = apiRouter;
