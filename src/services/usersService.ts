import Knex from "knex"
import User from "../models/user"

export default interface UsersService {
  getUsers(): Promise<User[]>
  getUser(id: number): Promise<User>
  findOrCreateUser(email: string): Promise<User>
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

  public async findOrCreateUser(email: string): Promise<User> {
    let user: User = await this.database("users")
      .where({email})
      .first()

    if (!user) {
      // SQLite3 is limited to only return the primary key when
      // using `insert`. Consider improving this logic using
      // `returning` if not using SQLite3.
      const [createdUserId] = await this.database("users")
        .insert({email})

      user = await this.getUser(createdUserId)
    }

    return user
  }
}

export function create(database: Knex): UsersService {
  return new UsersServiceImpl(database)
}
