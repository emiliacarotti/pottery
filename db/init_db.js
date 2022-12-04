//SEED DATA


const client = require("./client");
const { user,
  address,
  pot,
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
        DROP TABLE IF EXISTS pot;
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
          CREATE TABLE pot (
            potid SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            stock VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
          );
          CREATE TABLE cart (
            cartid SERIAL PRIMARY KEY,
            sessionid INTEGER NOT NULL,
            userid INTEGER REFERENCES users(userid)
          );
          CREATE TABLE cart_items (
            cartid INTEGER REFERENCES cart(cartid) NOT NULL,
            potid INTEGER REFERENCES pot(potid) ON DELETE CASCADE,
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
            potid INTEGER REFERENCES pot(potid) NOT NULL,
            count INTEGER NOT NULL
          );
      `);

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables!" + error);
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
    console.error("Error creating initial users!" + error)
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
        state: "MI",
        zip: 48013,
        payment: "stripe",
        currency: "USD"
      },
      {
        firstname: 'Emmet',
        lastname: 'Brown',
        street: '1640 Candyland Ln',
        city: 'Hillside',
        state: "CA",
        zip: 90210,
        payment: "stripe",
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

async function createInitialPottery() {
  console.log("Creating creatures...")
  try {
    const potteryToCreate = [
      {
        name: "Quilted Speckled White Mug on Brown Clay", //1
        price: 40,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/1.jpg?alt=media&token=f97c289a-8cd8-46ed-a562-17f7fbe679a0"
      },
      {
        name: "Ridged Speckled Aqua Mug", //2
        price: 26,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/2.jpg?alt=media&token=fa15986c-0506-475c-b1ef-0588584a5cd8"
      },
      {
        name: "Ying Yang Split Catch-All Dish", //12
        price: 35,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/12.jpg?alt=media&token=30f59570-80e0-4f41-bf99-7250be9eb8ac"
      },
      {
        name: "Tall Speckled White and Emerald Striped Mug on Natural Clay", //3
        price: 38,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/3.jpg?alt=media&token=087f1120-89fb-459c-9dec-1b6f398a5925"
      },
      {
        name: "Hand Painted Leaf Mug on Natural Clay", //15
        price: 40,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/15.jpg?alt=media&token=c4dd90f2-5bc7-43a9-a28b-24ec34b5a27b"
      },
      {
        name: "Speckled White Bubble Mug", //13
        price: 27,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/13.jpg?alt=media&token=2fb6d0ee-2b2d-4509-9e1d-3d07f37d31bc"
      },
      {
        name: "Bue and White Speckled Stripe Plates", //17
        price: 25,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/17.jpg?alt=media&token=9b09840e-fbd5-4ea1-9fe3-46248e26edfb"
      },
      {
        name: "Blue Carved Mug on Brown Clay", //4
        price: 35,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/4.jpg?alt=media&token=3de7cf69-1bf0-4d09-b92f-03a858f88f3f"
      },
      {
        name: "Brown Carved Catch-All Bowl", //16
        price: 20,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/16.jpg?alt=media&token=63c3f754-3ac9-4685-ad02-7af528b5ff6b"
      },
      {
        name: "Blue and Brown Blend Mug", //5
        price: 24,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/5.jpg?alt=media&token=fc84288a-4e16-4491-9af1-912c00f72e98"
      },
      {
        name: "Speckled White and Emerald Striped Mug on Brown Clay", //6
        price: 30,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/6.jpg?alt=media&token=fd48f15d-39f2-4ca2-a86e-7567f0ccbf8f"
      },
      {
        name: "Blue and Brown Fade Bubble Mug", //14
        price: 27,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/14.jpg?alt=media&token=bf0a901f-de85-4909-839f-c79a106500d3"
      },
      {
        name: "Speckled Gold and White Blend Carved Mug", //7
        price: 30,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/7.jpg?alt=media&token=6fc82cd1-c0ca-4a83-b5f9-4f714d54c6b7"
      },
      {
        name: "White and Violet Drip Mug", //8
        price: 25,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/8.jpg?alt=media&token=afa3340f-35bc-4fdb-be91-3b9347931029"
      },
      {
        name: "Quilted Blue Mug on Brown Clay", //9
        price: 40,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/9.jpg?alt=media&token=b4689671-750b-4e46-bed1-748270f53b87"
      },
      {
        name: "Speckled White Gold Rim Drip Tray", //11
        price: 30,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/11.jpg?alt=media&token=6e59bbe6-8d90-4bfd-a4b9-b71b1df67766"
      },
      {
        name: "Speckled White and Brown Brushed Mug", //18
        price: 20,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/18.jpg?alt=media&token=557dd8df-f8e9-4263-aa8c-92cbe487324d"
      },
      {
        name: "Moss Green Carved Mug", //10
        price: 25,
        stock: 10,
        image: "https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/10.jpg?alt=media&token=a6e3b6ae-e2eb-4efe-bd48-8240384d1f34"
      },

    ]
    const pottery = await Promise.all(potteryToCreate.map(pot.createPot))

    console.log("creatures created:")
    console.log(pottery)

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
    console.error("Error creating initial cart!" + error)

  }
}

async function createInitialCartItems() {
  console.log("Starting to create initialcart items...")
  try {
    const cartItemsToCreate = [
      {
        cartid: 1,
        potid: 1,
        count: 1
      },
      {
        cartid: 2,
        potid: 2,
        count: 3
      },
      {
        cartid: 3,
        potid: 3,
        count: 2
      }
    ]
    const cartItemsContent = await Promise.all(cartItemsToCreate.map(cart.createCartItems))

    console.log("Cart items created:")
    console.log(cartItemsContent)
    console.log("Finished creating inital cart items!")
  } catch (error) {
    console.error("Error creating initial cart items!" + error)

  }
}

//REBUILD
async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialAddress()
    await createInitialPottery()
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