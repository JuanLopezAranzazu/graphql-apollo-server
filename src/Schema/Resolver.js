// queries
const { Query: QueriesUser } = require("./Resolvers/User");
const { Query: QueriesPosition } = require("./Resolvers/Position");
// mutations
const { Mutation: MutationsUser } = require("./Mutations/User");
const { Mutation: MutationsPosition } = require("./Mutations/Position");

const resolvers = {
  Query: {
    ...QueriesUser,
    ...QueriesPosition,
  },

  Mutation: {
    ...MutationsUser,
    ...MutationsPosition,
  },
};

module.exports = { resolvers };
