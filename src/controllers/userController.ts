import express, { Request, Response, Router } from "express"
import {renderStaticPage} from "../views/renderPage"
import indexView from "../views/user/index"

export default class UserController {
  public router: Router

  constructor() {
    this.router = express.Router()

    this.router.get("/", this.index.bind(this))
  }

  public async index(request: Request, response: Response) {
    const displayName = request.user.displayName

    response.send(renderStaticPage(indexView({displayName})))
  }
}
