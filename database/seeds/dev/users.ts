import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        { 
          id: 1, 
          email: "testuser1@example.com" 
        },
        { 
          id: 2, 
          email: "testuser2@example.com" 
        },
        { 
          id: 3, 
          email: "testuser3@example.com" 
        },
      ])
    })
}
