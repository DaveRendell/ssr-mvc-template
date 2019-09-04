import request from "supertest"
import {cookieName} from '../../src/authentication/jwt'
import {startApp, getJwtToken, httpStatus} from "./snapshotTestUtilities"

describe("User page", () => {
  let app: Express.Application
  const validJwtToken = getJwtToken({id: 1})

  beforeAll(async () => {
    app = await startApp()
  })
  
  describe("index", () => {
    it("returns unauthorised if user is not logged in", async () => {
      const response = await request(app).get("/user/")

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
