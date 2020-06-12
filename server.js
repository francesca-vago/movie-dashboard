const express = require('express');
const graphQLHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const app = express();

// Allow cross-origin
app.use(cors());

app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));