const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServer, gql } = require("apollo-server");

const { readFileSync } = require("fs");

const users = [
  {
    email: "support@apollographql.com",
    name: "Apollo Studio Support",
    totalProductsCreated: 4,
  },
];

const typeDefs = gql(readFileSync("./users.graphql", { encoding: "utf-8" }));
const resolvers = {
  User: {
    __resolveReference: (reference) => {
      return users.find((u) => u.email == reference.email);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
