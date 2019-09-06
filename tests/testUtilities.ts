import * as Config from "../src/config"
import jwt from "jsonwebtoken"

export const httpStatus = {
  ok: 200,
  found: 302,
  unauthorized: 401
}

export function getJwtToken(
  id: number, 
  displayName: string
): string {
  const config = Config.create("test")
  return jwt.sign(
    {id, displayName},
    config.authentication.jwtSecret,
    {
      noTimestamp: true
    }
  )
}
