// grab our db client connection to use with our adapters
const client = require('./client');


// TABLE HISTORY - DB FUNCTIONS----------
async function getUserHistory() {
    try {
        const { rows } = await client.query(`
<<<<<<< HEAD
        SELECT userid, pricetotal, count, status, date
=======
        SELECT historyid, price, count, status, date
>>>>>>> 181ba2fcc0d59481e0ef6aac7514e7ef58f2a3b9
        FROM history;
      `);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error getting userHistory!"+error);
    }
}
//CreateOrderHistory 
<<<<<<< HEAD
async function createHistory({ userid, pricetotal, count, status, date }) {
  console.log("create ORDER history", userid, pricetotal, count, status, date )
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO history( userid, pricetotal, count, status, date) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (historyid) DO NOTHING 
      RETURNING *;
    `, [ userid, pricetotal, count, status, date ]);
=======
async function createUserHistory({ historyid, price, count, status, date }) {
  console.log("create user history", historyid, price, count, status, date )
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO history(historyid, price, count, status, date) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (historyid) DO NOTHING 
      RETURNING *;
    `, [historyid, price, count, status, date ]);
>>>>>>> 181ba2fcc0d59481e0ef6aac7514e7ef58f2a3b9
    return user;
} catch (error) {
console.error("Error creating ORDER history!"+error);
}
}

// TABLE HISTORY_ITEMS - DB FUNCTIONS----------

<<<<<<< HEAD
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
=======
async function createOrderHistory({ price, count, status, date}) {
  try {
      const { rows } = await client.query(`
      INSERT INTO history( price, count, status, date)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `, [ price, count, status, date]);
>>>>>>> 181ba2fcc0d59481e0ef6aac7514e7ef58f2a3b9
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error creating history item !"+error);
  }
}

module.exports = {
    // add database adapter functions here
    getUserHistory,
<<<<<<< HEAD
    createHistory,
    getHistoryItems,
    createInitialHistoryItems
=======
    createUserHistory,
    createOrderHistory
>>>>>>> 181ba2fcc0d59481e0ef6aac7514e7ef58f2a3b9
  };