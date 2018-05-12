import { version } from '../../package.json'
import { sequence } from 'function-tree'

import users from '../users'
import {parseUserFromUri, parseAorFromUri} from '../lib/parsers'

const register = [
  function registerUser({redis, props, path, }) {

    const contact = props.req.msg.headers.contact
    const aor =  parseAorFromUri(contact)
    const user = parseUserFromUri(contact)

    users.set(user, aor);

    return { contact, aor, user, users) }
  }
]

export default (ft) => {
  return (req, res) => {

    ft.run(sequence('register', register), { req })
      .then(props => {

        const headers = {};
        headers['Contact'] = `${req.get('Contact')};expires=${req.get('expires') || 3600}`;

        return res.send(200, {headers})
      })
      .catch(error => {

        return res.send(500)
      })
  }
}
