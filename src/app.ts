import cookieParser from "cookie-parser"
import express, {Router} from "express"
import Knex from "knex"
import sassMiddleware from "node-sass-middleware"
import passport from "passport"
import path from "path"
import setupPassport from "./authentication/setupPassport"
import Config from "./config"
import GoogleAuthController from "./controllers/googleAuthController"
import HomepageController from "./controllers/homepageController"
import UserController from "./controllers/userController"
import DecodeUserInfoMiddleware from "./middleware/decodeUserInfoMiddleware"
import * as UsersService from "./services/usersService"

export default async function createApp(
  config: Config,
  database: Knex
): Promise<express.Express> {

  // Run database migrations
  await database.migrate.latest()

  // Create services
  const usersService = UsersService.create(database)

  // Create Middleware
  const decodeUserInfoMiddleware = new DecodeUserInfoMiddleware(config)

  // Create controllers
  const homepageController = new HomepageController(usersService)
  const userController = new UserController()
  const googleAuthController = new GoogleAuthController(usersService, config)

  const app = express()
  app.use(cookieParser())
  app.use(decodeUserInfoMiddleware.decode)
  app.use(setupPassport(usersService, config))

  // Serve SASS source files as CSS. Only used in development
  const stylesDirectory = path.join(__dirname, "styles")
  app.use("/styles", sassMiddleware({
    src: stylesDirectory,
    outputStyle: "compressed",
  }))
  app.use("/styles", express.static(stylesDirectory))

  // Serve static files
  const publicDirectory = path.join(__dirname, "..", "public")
  app.use("/public", express.static(publicDirectory))

  // Define application routes
  app.use(
    "/google-auth/",
    passport.authenticate(
      "google",
      {scope: "openid email profile"}
    ),
    googleAuthController.router
  )
  const openRoutes = Router()
  const authenticatedRoutes = Router()

  openRoutes.use("/", homepageController.router)

  authenticatedRoutes.use("/user/", userController.router)

  app.use(openRoutes)
  app.use(passport.authenticate("jwt"), authenticatedRoutes)

  return app
}
