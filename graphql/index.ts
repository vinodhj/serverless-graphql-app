import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "*",
    },
  },
});
