const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    token: String
  }

  type Query {
    findAllUsers: [User!]!
    findByIdUser(id: ID!): User!
  }

  input CreateUserInput {
    name: String!
    username: String!
    password: String!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    loginUser(input: LoginUserInput!): User!
  }
`;

module.exports = { typeDefs };
