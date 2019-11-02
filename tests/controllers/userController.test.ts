import request from "supertest"
import express from 'express'
import * as index from '../../src/views/pages/user/index'
import UserController from "../../src/controllers/userController"
import {mockUserMiddleware} from './controllerTestUtilities'

describe("UserController", () => {
  const userController = new UserController()

  const app = express()
  app.use(mockUserMiddleware({id: 1, displayName: "test-name"}))

  app.use(userController.router)

  const indexSpy = jest.spyOn(index, 'default')

  describe("index", () => {
    it("renders the user index template", async () => {
      await request(app).get("/")
      
      expect(indexSpy).toHaveBeenCalledTimes(1)
    })

    it("passes user email to the template", async () => {
      await request(app).get("/")
      
      expect(indexSpy).toHaveBeenCalledWith({
        displayName: "test-name"
      })
    })
  })
})