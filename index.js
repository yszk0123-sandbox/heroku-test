const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const NAME = process.env.MY_NAME || 'unknown';

app.get('/', (req, res) => res.send(`Hello ${NAME}!`));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
