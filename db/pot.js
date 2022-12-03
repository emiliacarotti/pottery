const client = require("./client");

async function getAllPottery() {
  try {
    const { rows } = await client.query(`
      SELECT potid, name, price, stock, image
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

      SELECT potid, name, price, stock, image
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
  image,
}) {
  try {
    const { rows } = await client.query(
      `
       INSERT INTO pot(name, price, stock, image)
       VALUES ($1,$2,$3,$4)
       RETURNING *;
      `,
      [name, price, stock, image]
    );
    //console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating creatures!" + error);
  }

}

//PATCH CREATURES

async function updatePot(potid, name, price, stock) {
  try {
    console.log([name, price, stock, potid])
    const { rows } = await client.query(
      `UPDATE pot
       SET name = $1, price = $2, stock = $3
       WHERE potid=$4`,
      [name, price, stock, potid]
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

