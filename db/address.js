const client = require('./client');

// Get all addresses
async function getAddresses() {

  try {
    const { rows } = await client.query(`
        SELECT addressid, firstName, LastName, Street, City, State, Zip
        FROM address;
      `);
    console.log(rows)
    return rows;

  } catch (error) {
    console.error("Error getting addresses!" + error);
  }
}

// Create Address
async function createAddresses({ firstname, lastname, street, city, state, zip, payment, currency }) {

  try {
    const { rows } = await client.query(`
      INSERT INTO address(firstname, lastname, street, city, state, zip, payment, currency)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `, [firstname, lastname, street, city, state, zip, payment, currency]);
    console.log(rows)
    return rows;

  } catch (error) {
    console.error("Error creating address!" + error);
  }
}

// Export
module.exports = {
  getAddresses,
  createAddresses
};