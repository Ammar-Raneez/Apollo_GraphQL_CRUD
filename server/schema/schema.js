const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const { projects, clients } = require('../sampleData');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find(client => client.id === parent.clientId);
      }
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      }
    },
    client: {
      type: ClientType,

      // Might need to pass an ID as arg for querying
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find(client => client.id === args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find(project => project.id === args.id);
      }
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
