import passport from "passport"
import Config from "../config"
import UsersService from "../services/usersService"
import googleAuthentication from "./google"
import jwtAuthentication from "./jwt"

export default function setupPassport(
  usersService: UsersService,
  config: Config
) {

  passport.use("jwt", jwtAuthentication(usersService))
  passport.use(googleAuthentication(usersService, config))

  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id)
  })

  return passport.initialize()
}
