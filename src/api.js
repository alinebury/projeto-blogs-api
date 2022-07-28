const express = require('express');
const usersRoutes = require('./Routes/usersRoutes');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/users', usersRoutes);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
