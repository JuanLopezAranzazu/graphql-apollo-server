/*
const { rule } = require("graphql-shield");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthorized = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.req.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace("Bearer", "").trim();
  const { userId } = jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: "HS256",
  });
  return !!userId;
});

module.exports = { isAuthorized };
*/

/*
const { rule } = require("graphql-shield");
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  console.log(ctx.req.headers);
  const authHeader = ctx.req.headers.authorization;
  console.log("auth header", authHeader);
  if (!authHeader) {
    throw new AuthenticationError("Error headers");
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const user = await jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: "HS256",
      });
      console.log("user", user);
      return !!user;
    } catch (error) {
      throw new AuthenticationError("Session expired, please login!", error);
    }
  }
  throw new AuthenticationError("Authentication token must be Bearer [token]");
});

module.exports = { isAuthenticated };
*/

const { rule } = require("graphql-shield");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthorized = rule()(async (parent, args, { user }, info) => {
  return user !== null;
});

const verifyToken = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace("Bearer", "").trim();
  const user = jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: "HS256",
  });
  return user;
};

module.exports = { isAuthorized, verifyToken };
