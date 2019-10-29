const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs () {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production'
    }
  },
  version: require('../package.json').version,
  apiPrefix: '/api/v1'
}

// TODO: Gérer la config en fonction de l'environnement (voir avec Sacha)

export default defaultConfig