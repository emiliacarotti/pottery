// grab our db client connection to use with our adapters
const client = require('./client');


// TABLE HISTORY - DB FUNCTIONS----------
async function getUserHistory() {
    try {
        const { rows } = await client.query(`
        SELECT userid, pricetotal, count, status, date
        FROM history;
      `);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error getting userHistory!"+error);
    }
}
//CreateOrderHistory 
async function createHistory({ userid, pricetotal, count, status, date }) {
  console.log("create ORDER history", userid, pricetotal, count, status, date )
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO history( userid, pricetotal, count, status, date) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (historyid) DO NOTHING 
      RETURNING *;
    `, [ userid, pricetotal, count, status, date ]);
    return user;
} catch (error) {
console.error("Error creating ORDER history!"+error);
}
}

// TABLE HISTORY_ITEMS - DB FUNCTIONS----------

async function getHistoryItems() {
  try {
      const { rows } = await client.query(`
      SELECT historyid, creatureid, priceitem, count
      FROM history_items;
    `);
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error getting history item!"+error);
  }
}


async function createInitialHistoryItems({ historyid, creatureid, priceitem, count}) {
  try {
      const { rows } = await client.query(`
      INSERT INTO history_items(historyid, creatureid, priceitem, count)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `, [ historyid, creatureid, priceitem, count]);
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error creating history item !"+error);
  }
}

module.exports = {
    // add database adapter functions here
    getUserHistory,
    createHistory,
    getHistoryItems,
    createInitialHistoryItems
  };