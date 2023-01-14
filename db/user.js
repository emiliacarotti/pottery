const client = require('./client');
const bcrypt = require('bcrypt');

// Get all users
async function getAllUsers() {

  try {
    const { rows } = await client.query(`
        SELECT userid, username
        FROM users;
      `);
    console.log(rows)
    return rows;

  } catch (error) {
    console.error("Error getting user.");
  }
}

// Create user
async function createUser({ username, password, isAdmin }) {
  console.log("create user: ", username, password, isAdmin)

  try {
    const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password, isAdmin) 
          VALUES($1, $2, $3) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [username, password, isAdmin]);
    return user;

  } catch (error) {
    console.error("Error creating user.");
  }
}

// Get user by username
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

// Get user by id
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

// Export
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByUsername
};