'use strict'

const port = 8080;
const app = require('./config/server.js');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});