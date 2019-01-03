
const express = require('express');
//const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const applyMiddleware = require('redux');
const PORT = 8080;
//const app = express();
const app = express();

const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');
///const { apolloExpress, graphiqlExpress } = require('apollo-server');

//const { makeExecutableSchema } = require('graphql-tools');
const{ ApolloServer, gql } = require('apollo-server-express');
//const ApolloServer = require('apollo-server-express');


Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost/apollo', (err) => {
  if (err) {
    return err;
  }
  return true;
});

const seed = require('./seed');

seed();



// const executableSchema = makeExecutableSchema({
//   typeDefs: Schema,
//   resolvers: Resolvers,
// });
const SERVER = new ApolloServer({
  typeDefs: Schema,
  resolvers: Resolvers,
  context: {
      constructor: Connectors,
     },
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});
// SERVER.applyMiddleware({
//   app
// });
// app.use('/graphql', bodyParser.json(), apolloExpress({
//   schema: executableSchema,
//   context: {
//     constructor: Connectors,
//   },
// }));


// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));


SERVER.applyMiddleware({
  app
});




app.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});