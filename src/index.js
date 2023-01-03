/*
const { ApolloServer } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
// type defs
const { typeDefs } = require("./Schema/TypeDefs");
// resolvers
const { resolvers } = require("./Schema/Resolver");
// db
const { databaseConnection } = require("./db/index");

// middlewares
const { permissions } = require("./Middlewares/index");
const middlewares = [permissions];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermissions = applyMiddleware(schema, ...middlewares);
const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: ({ req, reply }) => ({
    req,
    reply,
  }),
});

server.listen().then(({ url }) => {
  console.log("SERVER RUNNING ON URL", url);
});
*/

/*
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
require("dotenv").config();
const { expressjwt } = require("express-jwt");
// type defs
const { typeDefs } = require("./Schema/TypeDefs");
// resolvers
const { resolvers } = require("./Schema/Resolver");
// db
const { databaseConnection } = require("./db/index");

const app = express();
// middlewares
const { permissions } = require("./Middlewares/index");
const { applyMiddleware } = require("graphql-middleware");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: ({ req }) => {
    return {
      req,
    };
  },
});

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log(
      "SERVER RUNNING ON URL",
      "http://localhost:" + 4000 + server.graphqlPath
    );
  });
});
*/

const { ApolloServer } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
// type defs
const { typeDefs } = require("./Schema/TypeDefs");
// resolvers
const { resolvers } = require("./Schema/Resolver");
// db
const { databaseConnection } = require("./db/index");

// middlewares
const { permissions } = require("./Middlewares/index");
const { verifyToken } = require("./Middlewares/Authenticated");
const middlewares = [permissions];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermissions = applyMiddleware(schema, ...middlewares);
const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: async ({ req, res }) => {
    const user = (await verifyToken(req, res)) || null;
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log("SERVER RUNNING ON URL", url);
});
