const { Sequelize } = require("sequelize");
const models = require("./Models/index");
require("dotenv").config();

const databaseConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

try {
  databaseConnection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

models(databaseConnection);
// databaseConnection.sync();

module.exports = { databaseConnection };
