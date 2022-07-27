//SEED DATA


const client  = require("./client");
const { user,
        address,
        creature    
} = require('./');    

 // drop tables in correct order
async function dropTables() {
      try {    
        client.connect();
    console.log("Drop tables...");
   
    await client.query(`
        DROP TABLE IF EXISTS history;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS creature;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS address;
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

          CREATE TABLE address (
            addressid SERIAL PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            payment VARCHAR(255) NOT NULL,
            currency VARCHAR(255) NOT NULL
          );
          CREATE TABLE users (
            userid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
          );
          CREATE TABLE creature (
            creatureid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price VARCHAR(255) NOT NULL,
            stock VARCHAR(255) NOT NULL,
            environment VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            food VARCHAR(255) NOT NULL,
            temper VARCHAR(255) NOT NULL
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
          console.error("Error creating tables!"+error);
  }
}      

//working
async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "moby", password: "mobymoby" },
      { username: "squanchie", password: "jerryisdumb" },
      { username: "docbrown", password: "backtothefuture" }
    ]
    const users = await Promise.all(usersToCreate.map(user.createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating inital users!")
  } catch (error) {
    console.error("Error creating initial users!"+error)
  }
}


async function createInitialAddress() {
  console.log("Creating address...");
  try {
    const addressToCreate = [
      { 
      firstname: 'moby', 
      lastname: 'bukhari',
      street: '123 main street',
      city: 'washington',
      state:"DC",
      zip:"20009",
      payment:"paypal",
      currency: "USD" 
      },
      { 
      firstname: 'rick', 
      lastname: 'sanchez',
      street: '6910 birdman ave',
      city: 'ann arbor',
      state:"MI",
      zip:"48013",
      payment:"stripe",
      currency: "USD" 
      },
      { 
      firstname: 'Emmet', 
      lastname: 'Brown',
      street: '1640',
      city: 'Hillside',
      state:"CA",
      zip:"90210",
      payment:"stripe",
      currency: "USD" 
      }
    ]
const addresses = await Promise.all(addressToCreate.map(address.createAddresses))

console.log("address created:")
console.log(addresses)
console.log("Finished creating address!");
} catch (error) {
  console.error("Error creating address!");
  throw error;
}
}

async function createInitialCreatures() {
  console.log("Creating creatures...")
  try {
    const creaturesToCreate = [
      {
        name: "Stitch",
        price: "$5000 USD",
        stock: "1",
        environment: "land",
        size: "M",
        food: "omnivore",
        temper: "stubborn"
      },
      {
        name: "Butter Robot",
        price: "$750 USD",
        stock: "10",
        environment: "land",
        size: "S",
        food: "electricity",
        temper: "compliant"
      },
      {
        name: "Mogwai",
        price: "$1000 USD",
        stock: "999",
        environment: "land",
        size: "S",
        food: "Omnivore",
        temper: "Varies"
      },
    ]
    const creatures = await Promise.all(creaturesToCreate.map(creature.createCreature))

    console.log("creatures created:")
    console.log(creatures)

    console.log("Finished creating creatures!")
  } catch (error) {
    console.error("Error creating creatures!")
    throw error
  }
}


async function createInitialOrderHistory() {
  console.log("Loading Order History...")
  try {
    const orderHistoryToCreate = [
      {
        historyid: "1",
        creatureid: "1",
        price: "$5000",
        count: "1",
        status: "not delievered, creature escaped packaging",
        date: "07/01/2022",
      },
      {
        historyid: "2",
        creatureid: "2",
        price: "$750",
        count: "1",
        status: "delivered",
        date: "07/02/2022",
      },
      {
        historyid: "3",
        creatureid: "3",
        price: "$1000",
        count: "1",
        status: "delivered",
        date: "07/03/2022",
      },
    ]
    const orderHistory = await Promise.all(orderHistoryToCreate.map(history.createOrderHistory))

    console.log("Order History created:")
    console.log(orderHistory)

    console.log("Finished creating order history!")
  } catch (error) {
    console.error("Error creating order history!")
    throw error


async function createCartItems() {
  console.log("Starting to create fake cart...")
  try {
    const cartToCreate = [
      {
        cartid: "1",
        userid: "25",
        creatureid: "1",
        count: "land",
        payment: "M"
      },
    ]
    const users = await Promise.all(usersToCreate.map(user.createUser))

    console.log("Cart created:")
    console.log(users)
    console.log("Finished creating inital users!")
  } catch (error) {
    console.error("Error creating initial users!"+error)

  }
}

//REBUILD
async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialAddress()
    await createInitialCreatures()
    await createInitialOrderHistory()

  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

rebuildDB()
//client.connect()
  .catch(console.error)
  .finally(() => client.end());


  module.exports = {
    rebuildDB,
    dropTables,
    createTables,
  }