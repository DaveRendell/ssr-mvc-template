import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import Config from "../config"

export const cookieName = "user-token"

function isUserInfo(
  decodedToken: string | object
): decodedToken is Express.User {
  return (decodedToken as Express.User).id !== undefined
    && (decodedToken as Express.User).displayName !== undefined
}

export default class DecodeUserInfoMiddleware {
  public config: Config

  constructor(config: Config) {
    this.config = config

    this.decode = this.decode.bind(this)
  }

  public decode(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies[cookieName]

    if (!token) {
      return next()
    }

    let decodedToken
    try {
      decodedToken = jwt.verify(
        token,
        this.config.authentication.jwtSecret
      )
    } catch (error) {
      return next()
    }

    if (isUserInfo(decodedToken)) {
      const {id, displayName} = decodedToken
      request.user = {id, displayName}
    }

    next()
  }
}
