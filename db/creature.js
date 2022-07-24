const client = require('./client');


async function getAllCreatures() {
  try {
      const { rows } = await client.query(`
      SELECT creatureid, name, price, stock, environment, size, food, temper)
      FROM creatures;
    `);
    console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error getting creatures!"+error);
  }
}

async function createCreature({name, price, stock, environment, size, food, temper}) {
    try {
        const { rows } = await client.query(`
        INSERT INTO creature(name, price, stock, environment, size, food, temper)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *;
      `,[name, price, stock, environment, size, food, temper]);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error creating creatures!"+error);
    }
}


module.exports = {
    // add database adapter functions here
    getAllCreatures,
    createCreature
  };