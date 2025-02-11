import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import { AppDataSource } from './data-source';
import { User } from './entities/User';
import { Product } from './entities/Product';

const app = express();
const PORT = process.env.PORT || 4000;

// Define your GraphQL schema and resolvers
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
  }

  type Query {
    users: [User!]!
    products: [Product!]!
  }
`;

const resolvers = {
    Query: {
      users: async () => {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
      },
      products: async () => {
        const productRepository = AppDataSource.getRepository(Product);
        return await productRepository.find();
      },
    },
  };

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
async function startServer() {
    // Initialize the database connection
    await AppDataSource.initialize();
    console.log('Database connected');

    await server.start();

    // Apply Apollo middleware to Express
    app.use('/graphql', json(), expressMiddleware(server));

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
}

startServer();