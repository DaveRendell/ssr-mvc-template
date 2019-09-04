import {Request} from "express"
import {Strategy as JwtStrategy} from "passport-jwt"
import Config from "../config"
import UsersService from "../services/usersService"

export const cookieName = "user-token"

export default function jwtAuthentication(
  usersService: UsersService,
  config: Config
) {
  return new JwtStrategy(
    {
      secretOrKey: config.authentication.jwtSecret,
      jwtFromRequest: (request: Request) => {
        return request.cookies[cookieName]
      }
    },
    (token, done) => {
      usersService.getUser(token.id)
        .catch(done)
        .then((user) => done(null, user))
    }
  )
}
