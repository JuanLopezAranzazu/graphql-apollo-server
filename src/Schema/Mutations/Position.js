const { databaseConnection } = require("./../../db/index");
const { models } = databaseConnection;

const Mutation = {
  async createPosition(parent, args) {
    const { name } = args;
    const position = await models.Position.create({ name });
    return position;
  },

  async deletePosition(parent, args) {
    const { id } = args;
    const position = await models.Position.findByPk(id);
    if (!position) {
      throw new Error("Position not found");
    }
    await models.Position.destroy({ where: { id } });
    return position;
  },
};

module.exports = { Mutation };
