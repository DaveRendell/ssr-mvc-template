import Knex from "knex"
import User from "../models/user"

export default interface UsersService {
  getUsers(): Promise<User[]>
  getUser(id: number): Promise<User>
}

class UsersServiceImpl implements UsersService {
  public database: Knex

  constructor(database: Knex) {
    this.database = database
  }

  public async getUsers(): Promise<User[]> {
    return await this.database.from<User>("users")
  }

  public async getUser(id: number): Promise<User> {
    return await this.database("users")
      .where({id})
      .first()
  }
}

export function create(database: Knex) {
  return new UsersServiceImpl(database)
}
