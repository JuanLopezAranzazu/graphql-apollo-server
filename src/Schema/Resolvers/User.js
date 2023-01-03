const { databaseConnection } = require("./../../db/index");
const { models } = databaseConnection;

const Query = {
  async findAllUsers() {
    const users = await models.User.findAll({
      include: [{ model: models.Position, as: "position" }],
    });
    return users;
  },
  async findByIdUser(parent, args) {
    const { id } = args;
    const user = await models.User.findByPk(id, {
      include: [{ model: models.Position, as: "position" }],
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};

module.exports = { Query };
