const client = require('./client');


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
      const { rows: [creature] } = await client.query(`
      SELECT creatureid, name, price, stock, environment, size, food, temper, image
      FROM creature
      WHERE creatureid=${creatureid}
    `);
    console.log(creature)
      return creature;
  } catch (error) {
    console.error("Error getting creature by ID !"+error);
  }
}

async function createCreature({ name, price, stock, environment, size, food, temper, image}) {
    try {
        const { rows } = await client.query(`
       INSERT INTO creature(name, price, stock, environment, size, food, temper, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7, $8)
       RETURNING *;
      `,[ name, price, stock, environment, size, food, temper, image]);
      //console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error creating creatures!"+error);
    }
}


//PATCH CREATURES
async function updateCreature({creatureid, ...inputs}) {
const setCreature = Object.keys(inputs).map(
  (key, index) => `"${key}"=$${index + 1}`
).join(', ');
console.log("inputs", inputs)
console.log("setCreatures", setCreature)
try {
console.log("creatureid",creatureid)
    await client.query(`
      UPDATE creature
      SET ${setCreature}
      WHERE creatureid=${creatureid}
      RETURNING *;
      `, Object.values(inputs));
  
   return await getCreatureById(creatureid);
  } catch (error) {
    console.error("update ERROR", error);
  }
}

// // Patch/Edit/Update Creature  -- 
// async function updateCreature({creatureid, name, price, stock, environment, size, food, temper}) {
//   try {
//       const { rows } = await client.query(`
//       UPDATE creature( name, price, stock, environment, size, food, temper)
//      SET name = ${name}, price = ${price}, stock = ${stock}, environment = ${environment}, size = ${size}, food = ${food}, temper = ${temper} 
//      WHERE creatureid = ${creatureid}
//      RETURNING *;
//     `,[creatureid, name, price, stock, environment, size, food, temper]);
//     console.log(rows)
//       return rows;
//   } catch (error) {
//     console.error("Error creating creatures!"+error);
//   }
// }

// Delete Creature 
async function deleteCreature(creatureid) {
  console.log("creatureid", creatureid)
  try {
      const { rows } = await client.query(`
      DELETE 
     FROM creature
     WHERE creatureid = $1
     RETURNING *;
    `,[creatureid]);
    console.log(rows)
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
    deleteCreature
  };