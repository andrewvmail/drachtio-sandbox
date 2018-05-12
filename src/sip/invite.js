import { version } from '../../package.json'
import { sequence } from 'function-tree'

import users from '../users'
import {parseUserFromUri} from '../lib/parsers'

const invite = [
  function invite({props, srf}) {

    return new Promise((resolve, reject) => {
      const to = parseUserFromUri(props.req.msg.headers.to)
      const from = parseUserFromUri(props.req.msg.headers.from)
      const uri = `${users.get(to)};transport=udp`

      srf.createB2BUA(props.req, props.res, uri).then(({uac, uas}) => {
        uac.on('destroy', () => uas.destroy()));
        uas.on('destroy', () => uac.destroy()));
        resolve()
      })
      .catch((err) => {
        resolve({err})
      });

    })
  }
]

export default (ft) => {
  return (req, res) => {

    ft.run(sequence('invite', invite), { req, res })
      .then(props => {
        //return res.send(200)
      })
      .catch(error => {
        return res.send(500)
      })
  }
}
