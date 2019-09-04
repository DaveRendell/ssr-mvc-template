import request from "supertest"
import {startApp, httpStatus} from "./snapshotTestUtilities"

describe("Home page", () => {
  let app: Express.Application

  beforeAll(async () => {
    app = await startApp()
  })
  
  describe("index", () => {
    it("returns homepage content", async () => {
      const response = await request(app).get("/")

      expect(response.status).toBe(httpStatus.ok)
      expect(response.text).toMatchSnapshot()
    })
  })
})
