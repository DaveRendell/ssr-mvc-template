import express, {Request, Response, Router} from "express"
import jwt from "jsonwebtoken"
import Config from "../config"
import {cookieName} from "../middleware/decodeUserInfoMiddleware"
import UsersService from "../services/usersService"

export default class GoogleAuthController {
  public router: Router
  public usersService: UsersService
  public config: Config

  constructor(usersService: UsersService, config: Config) {
    this.router = express.Router()
    this.usersService = usersService
    this.config = config

    this.router.get("/", this.index.bind(this))
  }

  public async index(request: Request, response: Response) {
    const {id, displayName} = request.user

    const token = jwt.sign(
      {id, displayName},
      this.config.authentication.jwtSecret,
      {
        noTimestamp: true
      }
    )

    response
      .cookie(cookieName, token)
      .redirect("/")
  }
}
