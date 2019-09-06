import * as dotenv from "dotenv"
import Knex from "knex"
dotenv.config()

export default interface Config {
  environment: string
  port: number,
  hostname: string,
  database: Knex.Config,
  authentication: AuthConfig
}

interface AuthConfig {
  jwtSecret: string,
  google: GoogleAuthConfig
}

interface GoogleAuthConfig {
  clientId: string,
  clientSecret: string
}

export function create(env: string = "development"): Config {
  switch (env) {
    case "development":
      return {
        environment: "development",
        port: 3000,
        hostname: "http://localhost:3000",
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
          jwtSecret: "dev-secret",
          google: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
          }
        }
      }
    case "test":
      return {
        environment: "test",
        port: 3000,
        hostname: "http://test-hostname",
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
          jwtSecret: "test-secret",
          google: {
            clientId: "test-google-client-id",
            clientSecret: "test-google-client-secret"
          }
        }
      }
  }
}
