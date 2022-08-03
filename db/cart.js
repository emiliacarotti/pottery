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
async function createCart({ sessionid, userid }) {
  console.log("create CART", sessionid, userid)
  try {
    const { rows } = await client.query(`
      INSERT INTO cart(sessionid, userid )
      VALUES($1, $2)
      RETURNING *;
    `, [userid, sessionid]);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating cart!", error);
  }
}
    //CREATE CART ITEMS
    async function createCartItems({ cartid, creatureid, count }) {
      console.log("create CART ITEMS", cartid, creatureid, count)
      try {
        const { rows } = await client.query(`
      INSERT INTO cart_items(cartid, creatureid, count)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [cartid, creatureid, count]);
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
      SELECT cartid, creatureid, count
      FROM cart_items;
    `);
        console.log(rows)
        return rows;
      } catch (error) {
        console.error("Error getting cart items !", error);
      }
    }
    //CREATE 
    async function createCartItems({ cartid, creatureid, count }) {
      console.log("create CART", cartid, creatureid)
      try {
        const { rows } = await client.query(`
    INSERT INTO cart_items(cartid, creatureid, count )
    VALUES($1, $2, $3)
    RETURNING *;
  `, [cartid, creatureid, count]);
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
    }