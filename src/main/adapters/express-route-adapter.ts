import { Request, Response } from 'express'

export const adaptRoute = (moduleFactory: any, method: string): any => {
  const factory = moduleFactory.create()
  return async (request: Request, response: Response) => {
    const httpResponse = await factory[method](request.body)
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode >= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
