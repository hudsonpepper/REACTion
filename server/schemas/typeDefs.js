const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    priorRuns: [Run]!
    statistics: Statistics!
  }

  type Run {
    datePlayed: String
    runtime: Float
    difficultyModifier: Float
    targetNumber: Int
    score: Int

  }

  type Statistics {
    highScore: Int
    runNumber: Int
    avgScore: Int
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRun(datePlayed: String, runtime: Float, difficultyModifier: Float, targetNumber: Int, score: Int): Auth
  }
`;

module.exports = typeDefs;
