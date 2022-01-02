const PREFIX = 'REACT_APP_';

const env = (name, def) => process.env[PREFIX + name] || def;

const configuration = {
  DECIDE_API: env('API_ENDPOINT')
};

export default configuration;