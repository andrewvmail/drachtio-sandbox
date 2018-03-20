import { version } from '../../package.json';
import register from './register'

export default (drachApp, {config, ft }) => {
  drachApp.register(register(ft))
}
