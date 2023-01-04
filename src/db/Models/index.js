const { User, UserSchema } = require("./User");
const { Position, PositionSchema } = require("./Position");
const {
  FollowerFollowing,
  FollowerFollowingSchema,
} = require("./FollowerFollowing");

function models(databaseConnection) {
  User.init(UserSchema, User.config(databaseConnection));
  Position.init(PositionSchema, Position.config(databaseConnection));
  FollowerFollowing.init(
    FollowerFollowingSchema,
    FollowerFollowing.config(databaseConnection)
  );
  User.associate(databaseConnection.models);
  Position.associate(databaseConnection.models);
  FollowerFollowing.associate(databaseConnection.models);
}

module.exports = models;
