// grab our db client connection to use with our adapters
const client = require('./client');



// DB USER FUNCTIONS
async function getUserCart() {
    try {
        const { rows } = await client.query(`
        SELECT cartid, userid, creatureid, count, payment
        FROM cart;
      `);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error getting cart!");
    }
}
//CREATE 
async function createCart({cartid, sessionid, userid}) {
  console.log("create CART",cartid, sessionid, userid )
  try {
  const { rows } = await client.query(`
      INSERT INTO cart(cartid, sessionid, userid)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [cartid, sessionid, userid ]);
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error creating cart!", error);
  }
}

//CREATE CART ITEMS
async function createCartItems({cartid, creatureid, count}) {
  console.log("create CART ITEMS",cartid, creatureid, count )
  try {
  const { rows } = await client.query(`
      INSERT INTO cart_items(cartid, creatureid, count)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [cartid, creatureid, count ]);
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
    createCartItems

  };