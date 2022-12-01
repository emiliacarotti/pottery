const client = require("./client");

async function getAllPottery() {
  try {
    const { rows } = await client.query(`
      SELECT potid, name, price, stock, size, image
      FROM pot;
    `);
    //console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error getting creatures!" + error);
  }
}
//working
async function getPotById(potid) {
  try {

    const {
      rows: [pot],
    } = await client.query(`

      SELECT potid, name, price, stock, size, image
      FROM pot
      WHERE potid=${potid}
    `);

    console.log(pot);
    return pot;

  } catch (error) {
    console.error("Error getting creature by ID !" + error);
  }
}


async function createPot({
  name,
  price,
  stock,
  size,
  image,
}) {
  try {
    const { rows } = await client.query(
      `
       INSERT INTO pot(name, price, stock, size, image)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *;
      `,
      [name, price, stock, size, image]
    );
    //console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating creatures!" + error);
  }

}

//PATCH CREATURES

async function updatePot(potid, name, price, stock, size) {
  try {
    console.log([name, price, stock, size, potid])
    const { rows } = await client.query(
      `UPDATE pot
       SET name = $1, price = $2, stock = $3, size = $4
       WHERE potid=$5`,
      [name, price, stock, size, potid]
    );
    console.log('new rows', rows);
    return rows;

  } catch (error) {
    console.error("update ERROR", error);
  }
}

// Delete Creature
async function deletePot(potid) {
  console.log("potid", potid);
  try {

    const { rows } = await client.query(
      `
    DELETE 
    FROM pot
    WHERE potid = $1
    `,
      [potid]
    );
    console.log(rows);
    return rows;

  } catch (error) {
    console.error("Error deleting creature!" + error);
  }
}

module.exports = {

  // add database adapter functions here
  getAllPottery,
  getPotById,
  createPot,
  updatePot,
  deletePot,
};

