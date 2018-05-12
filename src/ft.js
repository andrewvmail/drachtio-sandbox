import config from './config.json'
import register from './sip/register'
import invite from './sip/invite'

const Srf = require('drachtio-srf');
const srf = new Srf() ;

srf.connect({host: process.env.DRACHTIO_HOST, port: 9022, secret: 'cymru'}) ;
srf.on('connected', () => console.log('connected'))

const FunctionTree = require('function-tree').FunctionTree
const Devtools = require('function-tree/devtools').Devtools
const ft = new FunctionTree({ srf, config })

if (process.env.CEREBRAL_DEBUGGER) {
  const devtools = new Devtools({host: process.env.CEREBRAL_DEBUGGER, reconnect: true, https: false})
  devtools.add(ft)
}

srf.register(register(ft))
srf.invite(invite(ft))

export default callback => (callback(ft))

