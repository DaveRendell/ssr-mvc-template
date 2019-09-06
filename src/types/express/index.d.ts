declare namespace Express {
  // Contains all info we expect to be held in the JWT stored in
  // the auth cookie.
  interface User {
    // ID for this user in the database
    id: number,

    // Display name for this user, provided by external login 
    // service.
    displayName: string
  }
}
