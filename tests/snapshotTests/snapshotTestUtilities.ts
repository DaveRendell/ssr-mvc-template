import * as Config from "../../src/config"
import Knex from "knex"
import createApp from "../../src/app"
import jwt from "jsonwebtoken"

export async function startApp(): Promise<Express.Application> {
  const config = Config.create("test")
  const database = Knex(config.database)

  await database.migrate.latest()
  await database.seed.run()

  return await createApp(config, database)
}

export function getJwtToken({id}: {id: number}): string {
  const config = Config.create("test")
  return jwt.sign(
    JSON.stringify({id}),
    config.authentication.jwtSecret
  )
}

export const httpStatus = {
  ok: 200,
  unauthorized: 401
}