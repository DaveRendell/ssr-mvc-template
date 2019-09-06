import * as Config from "../../src/config"
import Knex from "knex"
import createApp from "../../src/app"

export async function startApp(): Promise<Express.Application> {
  const config = Config.create("test")
  const database = Knex(config.database)

  await database.migrate.latest()
  await database.seed.run()

  return await createApp(config, database)
}
