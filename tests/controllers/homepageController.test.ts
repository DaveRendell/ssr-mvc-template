import HomepageController from "../../src/controllers/homepageController";
import UsersService from "../../src/services/usersService"
import request from "supertest"
import express from 'express'
import * as index from '../../src/views/homepage/index'

describe("HomepageController", () => {
  const mockUsersService: UsersService = {
    getUsers: jest.fn(() => Promise.resolve([])),
    getUser: jest.fn()
  }
  const homepageController = new HomepageController(mockUsersService)
  
  const app = express()
  app.use(homepageController.router)

  const indexSpy = jest.spyOn(index, 'default')

  describe("index", () => {
    it("renders the homepage index template", async () => {
      await request(app).get("/")
      
      expect(indexSpy).toHaveBeenCalledTimes(1)
    })

    it("passes user's emails to the template", async () => {
      mockUsersService.getUsers = jest.fn(() => Promise.resolve([
        {id: 1, email: "test1@example.com"},
        {id: 2, email: "test2@example.com"}
      ]))

      await request(app).get("/")
      
      expect(indexSpy).toBeCalledWith({
        emails: [
          "test1@example.com",
          "test2@example.com"
        ]
      })
    })
  })
})