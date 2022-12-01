// grab our db client connection to use with our adapters
const client = require('./client');



// TABLE CART DB USER FUNCTIONS BELOW ---------------
async function getUserCart() {
  try {
    const { rows } = await client.query(`
        SELECT cartid, sessionid, userid 
        FROM cart;
      `);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error getting cart!");
  }
}
//CREATE 
async function createCart({ cartid, sessionid, userid }) {
  console.log("create CART", cartid, sessionid, userid)
  try {
    const { rows } = await client.query(`
      INSERT INTO cart(cartid, sessionid, userid)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [cartid, sessionid, userid]);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating cart!", error);
  }
}

//CREATE CART ITEMS
async function createCartItems({ cartid, potid, count }) {
  console.log("create CART ITEMS", cartid, potid, count)
  try {
    const { rows } = await client.query(`
      INSERT INTO cart_items(cartid, potid, count)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [cartid, potid, count]);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating cart items!", error);
  }
}

// TABLE CART_ITEMS DB FUNCTIONS BELOW --------------
async function getCartItems() {
  try {
    const { rows } = await client.query(`
      SELECT cartid, potid, count
      FROM cart_items;
    `);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error getting cart items !", error);
  }
}
//CREATE 
async function createCartItems({ cartid, potid, count }) {
  console.log("create CART", cartid, potid)
  try {
    const { rows } = await client.query(`
    INSERT INTO cart_items(cartid, potid, count )
    VALUES($1, $2, $3)
    RETURNING *;
  `, [cartid, potid, count]);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating cart items!", error);
  }
}

module.exports = {
  // add database adapter functions here
  getUserCart,
  createCart,
  getCartItems,
  createCartItems
};