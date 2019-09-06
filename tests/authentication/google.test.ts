import {Profile} from "passport-google-oauth"
import {googleOAuthCallback} from "../../src/authentication/google"
import UsersService from "../../src/services/usersService"

describe("googleOAuthCallback", () => {
  const usersService: UsersService = {
    getUsers: jest.fn(),
    getUser: jest.fn(),
    findOrCreateUser: jest.fn()
  }
  const callback = googleOAuthCallback(usersService)

  function createProfile(displayName: string): Profile {
    return {
      gender: "",
      _raw: "",
      _json: {},
      provider: "",
      id: "",
      displayName,
      emails: [
        {value: "test-email"}
      ]
    }
  }

  function callCallbackWithProfile(profile: Profile): Promise<any> {
    return new Promise((resolve, reject) => {
      callback("access-token", "refresh-token", profile, (error, user) => {
        error ? reject(error) : resolve(user)
      })
    })
  }

  it("returns user id returned from users service", async () => {
    // Arrange
    const profile = createProfile("test-name")
    usersService.findOrCreateUser = jest.fn(() => Promise.resolve({
      id: 123,
      email: "test-email"
    }))

    // Act
    const user: {id: number} = await callCallbackWithProfile(profile)

    // Assert
    expect(user.id).toBe(123)
  })

  it("returns display name from profile", async () => {
    // Arrange
    const profile = createProfile("test-name")

    // Act
    const user: {displayName: string} = await callCallbackWithProfile(profile)
    
    // Assert
    expect(user.displayName).toBe("test-name")
  })

  it("returns error if not email present", async () => {
    // Arrange
    const profile = createProfile("test-name")
    profile.emails = []

    // Act
    const promise: Promise<any> = callCallbackWithProfile(profile)
    
    // Assert
    expect(promise).rejects.toBe("No valid email")
  })
})