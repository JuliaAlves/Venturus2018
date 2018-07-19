'use strict'

const port = 3000;
const app = require('./config/server.js');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});