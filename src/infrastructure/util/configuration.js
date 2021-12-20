const PREFIX = 'REACT_APP_';

const env = (name, def) => process.env[PREFIX + name] || def;

export default {
  DECIDE_API: env('API_ENDPOINT')
}