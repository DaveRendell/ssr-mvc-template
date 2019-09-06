import {OAuth2Strategy, Profile, VerifyFunction} from "passport-google-oauth"
import Config from "../config"
import UsersService from "../services/usersService"

export const googleOAuthCallback = (usersService: UsersService) => async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction
) => {
  const email = profile.emails[0]

  if (!email) {
    return done("No valid email")
  }

  const user = await usersService.findOrCreateUser(email.value)

  return done(
    null,
    {
      id: user.id,
      displayName: profile.displayName
    }
  )
}

function googleOAuthOptions(config: Config) {
  return {
    clientID: config.authentication.google.clientId,
    clientSecret: config.authentication.google.clientSecret,
    callbackURL: config.hostname + "/google-auth/"
  }
}

export default function googleOauth2Authentication(
  usersService: UsersService,
  config: Config
): OAuth2Strategy {
  return new OAuth2Strategy(
    googleOAuthOptions(config),
    googleOAuthCallback(usersService)
  )
}
