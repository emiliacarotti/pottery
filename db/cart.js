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

async function createCart() {
  try {
      const { rows } = await client.query(`
      SELECT cartid, userid, creatureid, count, payment
      FROM cart;
      WHERE cartid=${cartid}
    `);
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