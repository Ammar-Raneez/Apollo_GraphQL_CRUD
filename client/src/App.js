import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import AddClientModal from './components/AddClientModal';
import Clients from './components/Clients';
import Projects from './components/Projects';
import Header from './components/Header';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(_, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:5000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Header />
      <div className="container">
        <AddClientModal />
        <Projects />
        <Clients />
      </div>
    </ApolloProvider>
  );
}

export default App;
