'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();



const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routers/v1.js');
const v2Routes = require('./routers/v2.js');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(authRoutes);


app.use(v1Routes);
app.use(v2Routes);


app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);



app.get('/', (req, res) => {
    res.status(200).send('Hellooooooooooooo');
});


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
