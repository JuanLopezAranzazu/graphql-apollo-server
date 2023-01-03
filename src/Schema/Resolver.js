const { databaseConnection } = require("./../db/index");
const { models } = databaseConnection;
const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {
  Query: {
    async findAllUsers(parent, args, ctx, info) {
      console.log("ctx", ctx.user);
      const users = await models.User.findAll({});
      return users;
    },
    async findByIdUser(parent, args) {
      const { id } = args;
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  },

  Mutation: {
    async createUser(parent, args) {
      const { password, ...rest } = args.input;
      const hashedPassword = await hash(password);
      const user = await models.User.create({
        ...rest,
        password: hashedPassword,
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      return {
        ...user,
        token,
      };
    },

    async deleteUser(parent, args) {
      const { id } = args;
      const user = await models.User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await models.User.destroy({ where: { id } });
      return user;
    },

    async loginUser(parent, args) {
      const { password, username } = args.input;
      const user = await models.User.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await verify(user.password, password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      return {
        id: user.id,
        username: user.username,
        token,
      };
    },
  },
};

module.exports = { resolvers };
