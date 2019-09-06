import {Request} from "express"
import {Strategy} from "passport-custom"
import Config from "../config"
import UsersService from "../services/usersService"

export default function jwtAuthentication(
  usersService: UsersService
) {
  return new Strategy((request: Express.Request, done) => {
    const token = request.user

    if (!token) {
      return done(null, false)
    }

    usersService.getUser(token.id)
      .catch(done)
      .then((user) => {
        if (user) {
          done(null, {
            id: user.id,
            displayName: token.displayName
          })
        } else {
          done(null, false)
        }
      })
  })
}
