import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';
import sip from './sip';
import config from './config.json';
import initializeFunctionTree from './ft'

let app = express();
app.server = http.createServer(app);
app.use(morgan('dev'));

var drachtio = require('drachtio');
var drachApp = drachtio() ;

initializeFunctionTree( ft => {

  drachApp.connect({host:'127.0.0.1', port: 9022, secret: 'cymru'}) ;

  sip(drachApp, {config, ft})

  app.use('/api', api({ config, ft }));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
