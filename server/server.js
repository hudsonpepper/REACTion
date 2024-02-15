const express = require('express');
const { ApolloServer } = require('@apollo/server');

const cors = require('cors');
require('dotenv').config()
const path = require('path');

const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});


const corsOptions = {
  origin: 'https://reaction-simulator.netlify.app', // Adjust this to your client's URL on netlify with no / at the end
  credentials: false, // we aren't tossing cookies around
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods 
  allowedHeaders: ['Content-Type', 'Authorization'], // this allows auth headers to get passed from client to server this is the `authorization bearer token` stuff
};

app.use(cors(corsOptions));

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
    cors: false
  }));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
