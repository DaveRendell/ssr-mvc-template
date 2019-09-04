import express, {Request, Response, Router} from "express"
import UsersService from "../services/usersService"
import indexView from "../views/homepage/index"
import {renderStaticPage} from "../views/renderPage"

/**
 * Controller for root of the website
 */
export default class HomepageController {
  public router: Router
  public usersService: UsersService

  constructor(usersService: UsersService) {
    this.router = express.Router()
    this.usersService = usersService

    this.router.get("/", this.index.bind(this))
  }

  public async index(request: Request, response: Response) {
    const users = await this.usersService.getUsers()
    const emails = users.map((user) => user.email)

    response.send(renderStaticPage(indexView({emails})))
  }
}
