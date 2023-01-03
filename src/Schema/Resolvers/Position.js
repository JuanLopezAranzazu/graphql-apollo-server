const { databaseConnection } = require("./../../db/index");
const { models } = databaseConnection;

const Query = {
  async findAllPositions() {
    const positions = await models.Position.findAll({
      include: [{ model: models.User, as: "users" }],
    });
    return positions;
  },
  async findByIdPosition(parent, args) {
    const { id } = args;
    const position = await models.Position.findByPk(id, {
      include: [{ model: models.User, as: "users" }],
    });
    if (!position) {
      throw new Error("Position not found");
    }
    return position;
  },
};

module.exports = { Query };
