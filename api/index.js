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
// ---------PROVIDED CODE?
apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
//SUBROUTERS
// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/creatures
const creaturesRouter = require('./creatures');
router.use('/creatures', creaturesRouter);

// ROUTER: /api/cart
const cartRouter = require('./cart');
router.use('/cart', cartRouter);

// ROUTER: /api/history
const historyRouter = require('./history');
router.use('/history', historyRouter);

//ROUTER: ERROR
router.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
});

router.get('*', (req, res)=> {
    res.status(404).send({
        name: "PageNotFoundError",
        message: "Error, page not found!"
      });
});



module.exports = apiRouter;
