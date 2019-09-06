import request from "supertest"
import {cookieName} from '../../src/middleware/decodeUserInfoMiddleware'
import {startApp} from "./snapshotTestUtilities"
import {httpStatus, getJwtToken} from "../testUtilities"

describe("User page", () => {
  let app: Express.Application
  const validJwtToken = getJwtToken(1, "test-name")
  const invalidJwtToken = getJwtToken(-1, "non-existant-user")

  beforeAll(async () => {
    app = await startApp()
  })
  
  describe("index", () => {
    it("returns unauthorised if user is not logged in", async () => {
      const response = await request(app).get("/user/")

      expect(response.status).toBe(httpStatus.unauthorized)
      expect(response.text).toMatchSnapshot()
    })

    it("returns unauthorised if user token is not valid", async () => {
      const response = await request(app)
        .get("/user/")
        .set("Cookie", [`${cookieName}=${invalidJwtToken}`])

      expect(response.status).toBe(httpStatus.unauthorized)
      expect(response.text).toMatchSnapshot()
    })

    it("returns user page content if user is logged in", async () => {
      const response = await request(app)
        .get("/user/")
        .set("Cookie", [`${cookieName}=${validJwtToken}`])

      expect(response.status).toBe(httpStatus.ok)
      expect(response.text).toMatchSnapshot()
    })
  })
})
