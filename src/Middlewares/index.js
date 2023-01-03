/*
const { shield } = require("graphql-shield");
const { isAuthenticated } = require("./Authenticated");

const permissions = shield({
  Query: {
    findAllUsers: isAuthenticated,
  },
  Mutation: {},
});

module.exports = { permissions };
*/

const { shield } = require("graphql-shield");
const { isAuthorized } = require("./Authenticated");

const permissions = shield({
  Query: {
    findAllUsers: isAuthorized,
    findByIdUser: isAuthorized,
  },
  Mutation: {},
});

module.exports = { permissions };
