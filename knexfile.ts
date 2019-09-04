import Knex from 'knex'

const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./database/dev.sqlite3"
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations"
  },
  seeds: {
    directory: "./database/seeds/dev"
  }
}

module.exports = {
  development: knexConfig
}
