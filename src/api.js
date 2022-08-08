const express = require('express');
require('express-async-errors');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const routes = require('./Routes/routes');

// ...

const app = express();

app.use(express.json());

// ...

app.use(routes);

app.use(errorHandlerMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
