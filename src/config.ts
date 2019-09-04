import Knex from "knex"

export default interface Config {
  environment: string
  port: number
  database: Knex.Config,
  authentication: AuthConfig
}

interface AuthConfig {
  jwtSecret: string
}

export function create(env: string = "development"): Config {
  switch (env) {
    case "development":
      return {
        environment: "development",
        port: 3000,
        database: {
          client: "sqlite3",
          connection: {
            filename: "./database/dev.sqlite3"
          },
          useNullAsDefault: true,
          migrations: {
            extension: "ts",
            directory: "./database/migrations"
          },
        },
        authentication: {
          jwtSecret: "dev-secret"
        }
      }
    case "test":
      return {
        environment: "test",
        port: 3000,
        database: {
          client: "sqlite3",
          connection: ":memory:",
          useNullAsDefault: true,
          migrations: {
            extension: "ts",
            directory: "./database/migrations"
          },
          seeds: {
            directory: "./database/seeds/dev"
          }
        },
        authentication: {
          jwtSecret: "test-secret"
        }
      }
  }
}
