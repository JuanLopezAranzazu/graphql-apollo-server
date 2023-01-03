const { User, UserSchema } = require("./User");
const { Position, PositionSchema } = require("./Position");

function models(databaseConnection) {
  User.init(UserSchema, User.config(databaseConnection));
  Position.init(PositionSchema, Position.config(databaseConnection));
  User.associate(databaseConnection.models);
  Position.associate(databaseConnection.models);
}

module.exports = models;
