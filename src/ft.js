const FunctionTree = require('function-tree').FunctionTree
const Devtools = require('function-tree/devtools').Devtools

export default callback => {
  const redis = require("redis")
  const client = redis.createClient({host: process.env.REDIS_HOST || '127.0.0.1'})

  client.on("error", function (err) {
    console.log("Error " + err)
  })

  const ft = new FunctionTree({redis:client})

  if (process.env.CEREBRAL_DEBUGGER) {
    const devtools = new Devtools({host: process.env.CEREBRAL_DEBUGGER, reconnect: true, https: false})
    devtools.add(ft)
  }

  callback(ft)
}
