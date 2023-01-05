const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./User");
const RELATION_TABLE = "relation";

const RelationSchema = {
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
class Relation extends Model {
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
      tableName: RELATION_TABLE,
      modelName: "Relation",
      timestamps: false,
    };
  }
}
module.exports = {
  Relation,
  RelationSchema,
  RELATION_TABLE,
};
