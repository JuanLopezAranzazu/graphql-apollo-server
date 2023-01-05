const { User, UserSchema } = require("./User");
const { Position, PositionSchema } = require("./Position");
const { Relation, RelationSchema } = require("./Relation");

function models(databaseConnection) {
  User.init(UserSchema, User.config(databaseConnection));
  Position.init(PositionSchema, Position.config(databaseConnection));
  Relation.init(RelationSchema, Relation.config(databaseConnection));
  User.associate(databaseConnection.models);
  Position.associate(databaseConnection.models);
  Relation.associate(databaseConnection.models);
}

module.exports = models;
