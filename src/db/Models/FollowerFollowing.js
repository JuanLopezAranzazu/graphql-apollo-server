const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./User");
const FOLLOWER_FOLLOWING_TABLE = "follower_following";

const FollowerFollowingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  followerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  followedId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};
class FollowerFollowing extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "follower",
      foreignKey: "followerId",
    });
    this.belongsTo(models.User, {
      as: "followed",
      foreignKey: "followedId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FOLLOWER_FOLLOWING_TABLE,
      modelName: "FollowerFollowing",
      timestamps: false,
    };
  }
}
module.exports = {
  FollowerFollowing,
  FollowerFollowingSchema,
  FOLLOWER_FOLLOWING_TABLE,
};
