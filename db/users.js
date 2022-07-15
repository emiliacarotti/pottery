const client = require("./client");


// DB USER FUNCTIONS

async function createUser({ username, password }) {

      try {
        const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password) 
          VALUES($1, $2) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [username]);
        delete user.password;
        return user;
    } catch (error) {
    console.error("Error creating user!");
    }
  }
  
  async function getUser({ username, password }) {
    try {
    
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
  
    if (password.length < 4 ) {
      return user;
    } else {
      console.error("Wrong password");
      return null;
    }
    } catch (error) {
    console.error("Error. db/users getuserbyusername!")
    }
   }


   module.exports = {
    createUser,
    getUser
  }