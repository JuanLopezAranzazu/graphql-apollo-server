const { databaseConnection } = require("./../../db/index");
const { models } = databaseConnection;
const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Mutation = {
  async createUser(parent, args) {
    const { password, positionId, ...rest } = args.input;

    // find position
    const position = await models.Position.findByPk(positionId);
    if (!position) {
      throw new Error("Position not found");
    }
    const hashedPassword = await hash(password);
    const user = await models.User.create({
      ...rest,
      positionId,
      password: hashedPassword,
    });

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

  async followUser(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    const follower = await models.User.findByPk(args.id);
    if (!follower) {
      throw new Error("Follower user not found");
    }
    await models.FollowerFollowing.create({
      followerId: follower.id,
      followedId: user.userId,
    });
    return {
      followerId: follower.id,
      followedId: user.userId,
    };
  },
};

module.exports = { Mutation };
