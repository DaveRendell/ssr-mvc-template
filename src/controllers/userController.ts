import express, { Request, Response, Router } from "express"
import indexView from "../views/pages/user/index"
import {renderPage} from "../views/renderPage"

export default class UserController {
  public router: Router

  constructor() {
    this.router = express.Router()

    this.router.get("/", this.index.bind(this))
  }

  public async index(request: Request, response: Response) {
    const displayName = request.user.displayName

    response.send(renderPage(indexView, {displayName}, "user"))
  }
}
