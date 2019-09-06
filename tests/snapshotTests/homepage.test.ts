import request from "supertest"
import {startApp} from "./snapshotTestUtilities"
import {httpStatus, getJwtToken} from "../testUtilities"
import {cookieName} from "../../src/middleware/decodeUserInfoMiddleware"

describe("Home page", () => {
  let app: Express.Application
  const validJwtToken = getJwtToken(1, "test-name")

  beforeAll(async () => {
    app = await startApp()
  })
  
  describe("index", () => {
    it("returns homepage content for unauthenticated users", async () => {
      const response = await request(app).get("/")

      expect(response.status).toBe(httpStatus.ok)
      expect(response.text).toMatchSnapshot()
    })

    it("returns homepage content for logged in users", async () => {
      const response = await request(app)
        .get("/")
        .set("Cookie", [`${cookieName}=${validJwtToken}`])

      expect(response.status).toBe(httpStatus.ok)
      expect(response.text).toMatchSnapshot()
    })
  })
})
