//importing DB files
const client = require('./client')
const user = require('./user')
const address = require ('./address')
const creature = require ('./creature')
const cart = require ('./cart')
const history = require('./history')



//exporting
module.exports = {
client,
user,
address,
creature,
cart,
history
};
