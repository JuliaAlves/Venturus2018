const express = require('express');
const app =express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    return res.send('Hello Word!');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})