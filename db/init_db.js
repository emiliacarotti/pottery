//SEED DATA


const client  = require("./client");
const { user,
        address,
        creature,
        history,
        cart    
} = require('./');    

 // drop tables in correct order
async function dropTables() {
      try {    
        client.connect();
    console.log("Drop tables...");
   
    await client.query(`
        DROP TABLE IF EXISTS history_items;  
        DROP TABLE IF EXISTS history;
        DROP TABLE IF EXISTS cart_items;
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
            zip INTEGER NOT NULL,
            payment VARCHAR(255) NOT NULL,
            currency VARCHAR(255) NOT NULL
          );
          CREATE TABLE users (
            userid SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin INTEGER DEFAULT 0
          );
          CREATE TABLE creature (
            creatureid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            stock VARCHAR(255) NOT NULL,
            environment VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            food VARCHAR(255) NOT NULL,
            temper VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
          );
          CREATE TABLE cart (
            cartid SERIAL PRIMARY KEY,
            sessionid INTEGER NOT NULL,
            userid INTEGER REFERENCES users(userid)
          );
          CREATE TABLE cart_items (
            cartid INTEGER REFERENCES cart(cartid) NOT NULL,
            creatureid INTEGER REFERENCES creature(creatureid) ON DELETE CASCADE,
            count INTEGER NOT NULL
          );
          CREATE TABLE history (
            historyid SERIAL PRIMARY KEY,
            price INTEGER NOT NULL,
            count INTEGER NOT NULL,
            status VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL
          );
          CREATE TABLE history_items (
            historyid INTEGER REFERENCES history(historyid) NOT NULL,
            creatureid INTEGER REFERENCES creature(creatureid) NOT NULL,
            count INTEGER NOT NULL
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
      { username: "admin", password: "admin", isAdmin: 1 },
      { username: "moby", password: "mobymoby", isAdmin: 0 },
      { username: "squanchie", password: "jerryisdumb", isAdmin: 0 },
      { username: "docbrown", password: "backtothefuture", isAdmin: 0 }
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
      firstname: 'Moby', 
      lastname: 'Bukhari',
      street: '123 Rumplover St',
      city: 'Washington',
      state: "DC",
      zip: 20009,
      payment: "paypal",
      currency: "USD" 
      },
      { 
      firstname: 'Rick', 
      lastname: 'Sanchez',
      street: '6910 Birdman Ave',
      city: 'Ann Arbor',
      state:"MI",
      zip: 48013,
      payment: "stripe",
      currency: "USD" 
      },
      { 
      firstname: 'Emmet', 
      lastname: 'Brown',
      street: '1640 Candyland Ln',
      city: 'Hillside',
      state:"CA",
      zip: 90210,
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
        price: 5000,
        stock: 1,
        environment: "land",
        size: "M",
        food: "omnivore",
        temper: "stubborn",
        image: "https://firebasestorage.googleapis.com/v0/b/beast-bazaar.appspot.com/o/Stitch.jpg?alt=media&token=bed7cb8b-1bf7-4cc0-b675-c84d9a9e4926"
      },
      {
        name: "Butter Robot",
        price: 750,
        stock: 10,
        environment: "land",
        size: "S",
        food: "electricity",
        temper: "compliant",
        image: "https://firebasestorage.googleapis.com/v0/b/beast-bazaar.appspot.com/o/butter-bot.png?alt=media&token=8f8013cd-df8d-4442-bbf3-048859f85e1d"
      },
      {
        name: "Mogwai",
        price: 1000,
        stock: 999,
        environment: "land",
        size: "S",
        food: "Omnivore",
        temper: "Varies",
        image: "https://firebasestorage.googleapis.com/v0/b/beast-bazaar.appspot.com/o/gizmo-mogwai.jpeg?alt=media&token=fe45089b-9b09-4baf-82d1-08ebf30aa5df"
        // Hey, did you know that you're not supposed to feed a Mogwai after midnight?
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
        historyid: 1,
        price: "5000",
        count: 1,
        status: "not delievered, creature escaped packaging",
        date: "07/01/2022",
      },
      {
        historyid: 2,
        price: "750",
        count: 1,
        status: "delivered",
        date: "07/02/2022",
      },
      {
        historyid: 3,
        price: "1000",
        count: 2,
        status: "delivered",
        date: "07/03/2022",
      },
    ]
    const orderHistory = await Promise.all(orderHistoryToCreate.map(history.createHistory))
    
    console.log("Order History created:")
    console.log(orderHistory)

    console.log("Finished creating order history!")
  } catch (error) {
    console.error("Error creating order history!")
    throw error

  }
}


async function createInitialCart() {
  console.log("Starting to create initial cart...")
  try {
    const cartToCreate = [
      {
        cartid: 1,
        userid: 1,
        sessionid: 1
      },
      {
        cartid: 2,
        userid: 2,
        sessionid: 2
      },
      {
        cartid: 3,
        userid: 3,
        sessionid: 3
      }
    ]
    const cartItems = await Promise.all(cartToCreate.map(cart.createCart))

    console.log("Cart created:")
    console.log(cartItems)
    console.log("Finished creating inital cart!")
  } catch (error) {
    console.error("Error creating initial cart!"+error)

  }
}

async function createInitialCartItems() {
  console.log("Starting to create initialcart items...")
  try {
    const cartItemsToCreate = [
      {
        cartid: 1,
        creatureid: 1,
        count: 1
      },
      {
        cartid: 2,
        creatureid: 2,
        count: 3
      },
      {
        cartid: 3,
        creatureid: 3,
        count: 2
      }
    ]
    const cartItemsContent = await Promise.all(cartItemsToCreate.map(cart.createCartItems))

    console.log("Cart items created:")
    console.log(cartItemsContent)
    console.log("Finished creating inital cart items!")
  } catch (error) {
    console.error("Error creating initial cart items!"+error)

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
    await createInitialCart()
    await createInitialCartItems()

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