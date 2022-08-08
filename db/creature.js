const client = require("./client");

async function getAllCreatures() {
  try {
      const { rows } = await client.query(`
      SELECT creatureid, name, price, stock, environment, size, food, temper, image
      FROM creature;
    `);
    //console.log(rows)
      return rows;
  } catch (error) {
    console.error("Error getting creatures!"+error);
  }
}
//working
async function getCreatureById(creatureid) {
  try {

    const {
      rows: [creature],
    } = await client.query(`

      SELECT creatureid, name, price, stock, environment, size, food, temper, image
      FROM creature
      WHERE creatureid=${creatureid}
    `);

    console.log(creature);
    return creature;

  } catch (error) {
    console.error("Error getting creature by ID !"+error);
  }
}


async function createCreature({
  name,
  price,
  stock,
  environment,
  size,
  food,
  temper,
  image,
}) {
  try {
    const { rows } = await client.query(
      `
       INSERT INTO creature(name, price, stock, environment, size, food, temper, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7, $8)
       RETURNING *;
      `,
      [name, price, stock, environment, size, food, temper, image]
    );
    //console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error creating creatures!" + error);
  }

}

//PATCH CREATURES

async function updateCreature(creatureid, name, price, stock, environment, size, food, temper) {
  try {
    console.log([ name, price, stock, environment, size, food, temper, creatureid])
    const { rows } = await client.query(
      `UPDATE creature
       SET name = $1, price = $2, stock = $3, environment = $4, size = $5, food = $6, temper = $7
       WHERE creatureid=$8`,
      [ name, price, stock, environment, size, food, temper, creatureid]
    );
    console.log('new rows', rows);
    return rows;

  } catch (error) {
    console.error("update ERROR", error);
  }
}

// Delete Creature
async function deleteCreature(creatureid) {
  console.log("creatureid", creatureid);
  try {

    const { rows } = await client.query(
      `
    DELETE 
    FROM creature
    WHERE creatureid = $1
    `,
      [creatureid]
    );
    console.log(rows);
    return rows;

  } catch (error) {
    console.error("Error deleting creature!"+error);
  }
}

module.exports = {

  // add database adapter functions here
  getAllCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
};

