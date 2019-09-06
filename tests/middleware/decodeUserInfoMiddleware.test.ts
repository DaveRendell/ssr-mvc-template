import DecodeUserInfoMiddleware, {cookieName} from "../../src/middleware/decodeUserInfoMiddleware"
import * as Config from "../../src/config"
import {getJwtToken} from "../testUtilities"
import jwt from "jsonwebtoken"

describe("DecodeUserInfoMiddleware", () => {
  const config = Config.create("test")
  const decodeUserInfoMiddleware = new DecodeUserInfoMiddleware(config)
  
  function getUserAddedByMiddlewareForToken(
    cookieValue: string
  ): Promise<Express.User> {
    return new Promise((resolve, reject) => {
      let user: Express.User

      const request = {
        cookies: {[cookieName]: cookieValue}, 
        user
      }

      decodeUserInfoMiddleware.decode(
        request as any,
        {} as any,
        (err) => err ? reject(err) : resolve(request.user) 
      )
    })
  }

  it("adds no user if no token provided", async () => {
    // Act
    const user = await getUserAddedByMiddlewareForToken(undefined)

    // Assert
    expect(user).toBe(undefined)
  })

  it("adds no user if token is incorrectly signed", async () => {
    // Arrange
    const incorrectKeyToken = jwt.sign(
      {id: 1, displayName: "test-name"},
      "incorrectKey")
    
    // Act
    const user = await getUserAddedByMiddlewareForToken(incorrectKeyToken)

    // Assert
    expect(user).toBe(undefined)
  })

  it("adds no user if token payload is invalid", async () => {
    // Arrange
    const invalidToken = jwt.sign(
      {attribute1: "foo", attribute2: "bar"},
      config.authentication.jwtSecret
    )
    
    // Act
    const user = await getUserAddedByMiddlewareForToken(invalidToken)

    // Assert
    expect(user).toBe(undefined)
  })

  it("adds user for valid signed token", async () => {
    // Arrange
    const validToken = getJwtToken(1, "test-name")
    
    // Act
    const user = await getUserAddedByMiddlewareForToken(validToken)

    // Assert
    expect(user).toStrictEqual({id: 1, displayName: "test-name"})
  })
})