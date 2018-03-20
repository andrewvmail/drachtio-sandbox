import { version } from '../../package.json'
import { sequence } from 'function-tree'

const register = [
  function register({redis, props, path}) {

  }
]

export default (ft) => {
  return (req, res) => {
    ft.run(sequence('register', register), { req })
      .then(props => {
        return   res.send( 200, {
          headers: {
            'Expires': 'hi'
          }
        })
      })
      .catch(error => {
        return   res.send( 500, {
          headers: {
            'Expires': 'expired'
          }
        })
      })
  }
}