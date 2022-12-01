// grab our db client connection to use with our adapters
const client = require('./client');


// TABLE HISTORY - DB FUNCTIONS----------
async function getUserHistory() {
  try {
    const { rows } = await client.query(`
        SELECT price, count, status, date
        FROM history;
      `);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error getting user!");
  }
}
//CreateOrderHistory 
async function createHistory({ price, count, status, date }) {
  console.log("create user history", price, count, status, date)
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO history( price, count, status, date) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (historyid) DO NOTHING 
      RETURNING *;
    `, [price, count, status, date]);
    return user;
  } catch (error) {
    console.error("Error creating user history!");
  }
}

// TABLE HISTORY_ITEMS - DB FUNCTIONS----------

async function getHistoryItems() {
  try {
    const { rows } = await client.query(`
      SELECT historyid, potid, count
      FROM history_items;
    `);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error getting user!");
  }
}


async function createHistoryItem({ historyid, potid, count }) {
  try {
    const { rows } = await client.query(`
      INSERT INTO history_items(historyid, potid, count)
      VALUES($1,$2,$3)
      RETURNING *;
    `, [historyid, potid, count]);
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating address!" + error);
  }
}

module.exports = {
  // add database adapter functions here
  getUserHistory,
  createHistory,
  getHistoryItems,
  createHistoryItem
};