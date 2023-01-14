const client = require('./client');

// Get cart
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

// Create cart
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

// Create cart items
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

// Get cart items
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

// Export
module.exports = {
  getUserCart,
  createCart,
  getCartItems,
  createCartItems
};