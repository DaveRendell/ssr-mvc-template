import express, {NextFunction} from 'express'

export function mockUserMiddleware(user: Express.User) {
  return (
    request: Express.Request, 
    response: Express.Response, 
    next: NextFunction
  ) => {
    request.user = user
    next()
  }
}