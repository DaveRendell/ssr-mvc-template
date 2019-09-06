import request from "supertest"
import GoogleAuthController from "../../src/controllers/googleAuthController"
import UsersService from "../../src/services/usersService"
import express from 'express'
import {mockUserMiddleware} from './controllerTestUtilities'
import {httpStatus, getJwtToken} from "../testUtilities"
import {cookieName} from "../../src/middleware/decodeUserInfoMiddleware"
import * as Config from "../../src/config"

describe("GoogleAuthController", () => {
  const usersService: UsersService = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    findOrCreateUser: jest.fn()
  }
  const config = Config.create("test")

  const googleAuthController = new GoogleAuthController(usersService, config)

  const app = express()
  app.use(mockUserMiddleware({id: 1, displayName: "test-name"}))

  app.use(googleAuthController.router)

  describe("index", () => {
    it("sets auth cookie", async () => {
      // Arrange
      const expectedToken = getJwtToken(1, "test-name")

      // Act
      const response = await request(app).get("/")

      // Assert
      expect(response.header['set-cookie'][0]).toBe(`${cookieName}=${expectedToken}; Path=/`)

    })

    it("returns a redirect", async () => {
      // Act
      const response = await request(app).get("/")

      // Assert
      expect(response.status).toBe(httpStatus.found)
      expect(response.header.location).toBe("/")
    })    
  })

})