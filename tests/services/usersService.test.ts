import * as Config from "../../src/config"
import Knex from 'knex'
import * as UsersService from "../../src/services/usersService"
import User from '../../src/models/user'

describe("usersService", () => {
  const config = Config.create("test")
  const database = Knex(config.database)
  const usersService = UsersService.create(database)

  function addUser(email: string) {
    return database('users').insert({email})
  }

  beforeAll(async () => {
    await database.migrate.latest()
  })

  beforeEach(async () => {
    await database("users").truncate()
  })

  describe("getUsers", () => {
    it("returns an empty array when there are no users", async () => {
      // Act
      const users: Array<User> = await usersService.getUsers()

      // Assert
      expect(users).toEqual([])
    })

    it("returns a list of users in the database", async () => {
      // Arrange
      await addUser("test1@example.com")
      await addUser("test2@example.com")
      
      // Act
      const users: Array<User> = await usersService.getUsers()

      // Assert
      expect(users).toEqual([
        {id: 1, email: "test1@example.com"},
        {id: 2, email: "test2@example.com"}
      ])
    })
  })

  describe("getUser", () => {
    it("returns a user from the database", async () => {
      // Arrange
      await addUser("test1@example.com")

      // Act
      const user = await usersService.getUser(1)

      // Assert
      expect(user).toEqual(
        {id: 1, email: "test1@example.com"}
      )
    })
  })
})