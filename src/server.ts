import chalk from "chalk"
import Knex from "knex"
import createApp from "./app"
import * as Config from "./config"

const config = Config.create(process.env.NODE_ENV)
const database = Knex(config.database)

console.log(`Running in ${chalk.blue(config.environment)} environment`)

createApp(config, database).then((app) => {
  app.listen(
    config.port,
    () => console.log(
      "Server started on " + chalk.cyan.underline(
        `http://localhost:${config.port.toString()}`
      )
    )
  )
})
