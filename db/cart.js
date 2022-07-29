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
async function createCart({cartid, userid, creatureid, count, payment}) {
  console.log("create CART",cartid, userid, creatureid, count, payment)
  try {
  const { rows } = await client.query(`
      INSERT INTO cart(userid, creatureid, count, payment)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [userid, creatureid, count, payment ]);
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error creating cart!");
  }
}

module.exports = {
    // add database adapter functions here
    getUserCart,
    createCart
  };