const { gql } = require('apollo-server-express');

const userDef = gql`
  
  type User {
    _id: ID!
    username: String!
    password: String
    admin: Boolean
    insertedAt: String
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(
      username: String!
      password: String!
    ) : User!

    signin(
      username: String!
      password: String!
    ) : String
  }

`;

module.exports = userDef;