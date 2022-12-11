require('dotenv').config();

module.exports = {
  development: {
    username: process.env.Database_username,
    password: process.env.Database_password,
    database: "smarthive",
    host: "192.168.0.28",
    dialect: "mysql",
    logging: false
  },
  "test": {
    "username": process.env.Database_username,
    "password": process.env.Database_password,
    "database": "smarthive",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.Database_username,
    "password": process.env.Database_password,
    "database": "smarthive",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
