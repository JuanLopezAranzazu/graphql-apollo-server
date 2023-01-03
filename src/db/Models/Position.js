const { Model, DataTypes, Sequelize } = require("sequelize");
const POSITION_TABLE = "position";

const PositionSchema = {
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
};

class Position extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      foreignKey: "positionId",
      as: "users",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POSITION_TABLE,
      modelName: "Position",
      timestamps: true,
    };
  }
}

module.exports = { POSITION_TABLE, PositionSchema, Position };
