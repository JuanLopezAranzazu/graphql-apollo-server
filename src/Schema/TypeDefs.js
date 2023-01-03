const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    positionId: ID!
    token: String
    position: Position
  }

  type Position {
    id: ID!
    name: String!
    users: [User!]
  }

  type Query {
    findAllUsers: [User!]!
    findByIdUser(id: ID!): User!
    findAllPositions: [Position!]!
    findByIdPosition: Position!
  }

  input CreateUserInput {
    name: String!
    username: String!
    password: String!
    positionId: ID!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    loginUser(input: LoginUserInput!): User!
    createPosition(name: String!): Position!
    deletePosition(id: ID!): Position!
  }
`;

module.exports = { typeDefs };
