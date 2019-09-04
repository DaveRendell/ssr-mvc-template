import express, {NextFunction} from 'express'
import Controller from '../../src/controllers/controller';

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