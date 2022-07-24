// grab our db client connection to use with our adapters
const client = require('./client');
const bcrypt = require('bcrypt');

// DB USER FUNCTIONS
async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT userid, username
        FROM users;
      `);
      console.log(rows)
        return rows;
    } catch (error) {
      console.error("Error getting user!");
    }
}


async function createUser({ username, password }) {
      console.log("create user", username, password)
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

  async function getUserByUsername(username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
      `, [username]);
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUserById(userid) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT userid, username
        FROM users
        WHERE userid=${userid}
      `);

        return user;
    } catch (error) {
        throw error;
    }
}

   module.exports = {
    // add database adapter functions here
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsername
  };