const { client } = require("./client");
const { createUser } = require('.');    

async function buildTables() {
  try {
    client.connect();
  } catch (error) {
    console.error("Error buildTables!");
  }
}
 // drop tables in correct order
async function dropTables() {
      try {    
    console.log("Drop tables...");
   
    await client.query(`
        DROP TABLE IF EXISTS history;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS description;
        DROP TABLE IF EXISTS creatures;
        DROP TABLE IF EXISTS address;
        DROP TABLE IF EXISTS users;
      `);

    console.log("Tables dropped successfully!");
  } catch (error) {
    console.error("Error dropping tables!");
  }
}

// build tables in correct order
async function createTables() {
  try {
      console.log("Starting to build tables...");

      await client.query(`
          CREATE TABLE users (
            userid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
          );
          CREATE TABLE address (
            addressid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            payment VARCHAR(255) NOT NULL,
            currency VARCHAR(255) NOT NULL
          );
          CREATE TABLE description (
            descriptionid SERIAL PRIMARY KEY,
            environment VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            food VARCHAR(255) NOT NULL,
            temper VARCHAR(255) NOT NULL
          );
          CREATE TABLE creature (
            creatureid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            descriptionid INTEGER REFERENCES description(descriptionid) NOT NULL,
            price VARCHAR(255) NOT NULL,
            stock VARCHAR(255) NOT NULL
          );
          CREATE TABLE cart (
            cartid SERIAL PRIMARY KEY,
            userid INTEGER REFERENCES users(userid) NOT NULL,
            creatureid INTEGER REFERENCES creature(creatureid) NOT NULL,
            count VARCHAR(255) NOT NULL,
            payment VARCHAR(255) NOT NULL
          );
          CREATE TABLE history (
            historyid SERIAL PRIMARY KEY,
            creatureid INTEGER REFERENCES creature(creatureid) NOT NULL,
            price VARCHAR(255) NOT NULL,
            count VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
          );
      `);

          console.log("Tables created successfully!");
  } catch (error) {
          console.error("Error creating tables!");
  }
}      
/*   -------------------------------GIVEN CODE?
}
async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    console.error("Error of throws!");
  }
}
*/

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "moby", password: "mobymoby" },
      { username: "squanchie", password: "jerryisdumb" },
      { username: "docbrown", password: "backtothefuture" },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
  }
}


async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()

  } catch (error) {
    console.log("Error during rebuildDB")
  }
}

/*   -------------------------------GIVEN CODE?
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
*/

  module.exports = {
    rebuildDB,
    buildTables,
    dropTables,
    createTables,
  }