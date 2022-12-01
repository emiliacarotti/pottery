//importing DB files
const client = require('./client')
const user = require('./user')
const address = require ('./address')
const pot = require ('./pot')
const cart = require ('./cart')
const history = require('./history')



//exporting
module.exports = {
client,
user,
address,
pot,
cart,
history
};
