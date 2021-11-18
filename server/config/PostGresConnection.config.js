const { Client } = require('pg')


const client = new Client({
    user: process.env.PGUSER,
    host: "localhost", 
    database: 'social-login', 
    password: process.env.PGPASSWORD,
    port: 5432
})
client.connect()

//Run on initial set-up or anytime you want to reset the database
// let setup_query = `DROP TABLE IF EXISTS users;

//                 CREATE TABLE users (
//                     id SERIAL PRIMARY KEY,
//                     username VARCHAR(255) NOT NULL,
//                     email VARCHAR(255) NOT NULL,
//                     password VARCHAR (255),
//                     created_at DATE NOT NULL,
//                     updated_at DATE NOT NULL
//                 );
//                 `   
// client.query(setup_query, (err, res) => {
//     if(err){ throw err }
//     console.log(res)
// })


module.exports = client
