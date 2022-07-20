// grab our db client connection to use with our adapters
const client = require('../client');


// DB USER FUNCTIONS
async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT userid, username
        FROM users;
      `);

        return rows;
    } catch (error) {
      console.error("Error getting user!");
    }
}


async function createUser({ username, password }) {

      try {
        const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password) 
          VALUES($1, $2) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [username, password]);
        return user;
    } catch (error) {
    console.error("Error creating user!");
    }
  }

  

   module.exports = {
    // add database adapter functions here
    getAllUsers,
    createUser
  };