import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json';
import initializeFunctionTree from './ft'

let app = express();
app.server = http.createServer(app);
app.use(morgan('dev'));

initializeFunctionTree( ft => {
  app.use('/api', api({ config }));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
