const express = require("express");
const apiRouter = express.Router();
const { getUserById } = require('../db');

// Middleware 
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Read JWT 
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

// Subrouters

// Router: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// Router: /api/address
const addressesRouter = require('./addresses');
apiRouter.use('/addresses', addressesRouter);

// Router: /api/creatures
const potteryRouter = require('./pottery');
apiRouter.use('/pottery', potteryRouter);

// Router: /api/cart
const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

// Router: /api/history
const historyRouter = require('./history');
apiRouter.use('/history', historyRouter);

// Router: Error
apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  });
});

// Router: Wildcard URL
apiRouter.get('*', (req, res) => {
  res.status(404).send({
    name: "PageNotFoundError",
    message: "Error, page not found!"
  });
});

// Export API Router
module.exports = apiRouter;