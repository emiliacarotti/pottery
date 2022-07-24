// grab our db client connection to use with our adapters
const client = require('./client');


// DB USER FUNCTIONS
async function getUserHistory() {
    try {
        const { rows } = await client.query(`
        SELECT historyid, creatureid, price, count, status, date
        FROM history;
      `);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error getting user!");
    }
}

module.exports = {
    // add database adapter functions here
    getUserHistory
  };