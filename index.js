const express = require('express');
const app = express();

const port = 3020;

app.get('/', (request, response) => {
    response.send('<h1>Hello, coders X</h1>');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));