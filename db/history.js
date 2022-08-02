// grab our db client connection to use with our adapters
const client = require('./client');


// DB USER FUNCTIONS
async function getUserHistory() {
    try {
        const { rows } = await client.query(`
        SELECT historyid, price, count, status, date
        FROM history;
      `);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error getting user!");
    }
}
//CreateOrderHistory 
async function createUserHistory({ historyid, price, count, status, date }) {
  console.log("create user history", historyid, price, count, status, date )
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO history(historyid, price, count, status, date) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (historyid) DO NOTHING 
      RETURNING *;
    `, [historyid, price, count, status, date ]);
    return user;
} catch (error) {
console.error("Error creating user history!");
}
}


async function createOrderHistory({ price, count, status, date}) {
  try {
      const { rows } = await client.query(`
      INSERT INTO history( price, count, status, date)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `, [ price, count, status, date]);
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error creating address!"+error);
  }
}

module.exports = {
    // add database adapter functions here
    getUserHistory,
    createUserHistory,
    createOrderHistory
  };