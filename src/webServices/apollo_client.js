import ApolloClient from 'apollo-boost';

// url web service GraphQL
const client = new ApolloClient({
    uri: process.env.REACT_APP_WEB_SERVICE_URL,
});


export default client;