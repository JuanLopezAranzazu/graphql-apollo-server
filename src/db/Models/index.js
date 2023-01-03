const { User, UserSchema } = require("./User");

function models(databaseConnection) {
  User.init(UserSchema, User.config(databaseConnection));
  User.associate(databaseConnection.models);
}

module.exports = models;
