

const ENVIRNOMENTS = {
  "local": "http://localhost:8888/public/api",
  "prod": "http://vanguard-trucking.com/api"
}


export const getEnv = (env) => {
  return ENVIRNOMENTS[env] || ENVIRNOMENTS.prod
}
