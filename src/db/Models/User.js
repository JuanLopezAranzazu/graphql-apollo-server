const { Model, DataTypes, Sequelize } = require("sequelize");
const USER_TABLE = "user";
const { POSITION_TABLE } = require("./Position");

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  positionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: POSITION_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Position, {
      foreignKey: "positionId",
      as: "position",
    });

    this.belongsToMany(models.User, {
      as: "followedes",
      through: models.Relation,
      foreignKey: "followerId",
    });

    this.belongsToMany(models.User, {
      as: "followers",
      through: models.Relation,
      foreignKey: "followedId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: true,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
