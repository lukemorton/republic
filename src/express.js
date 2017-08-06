import express from 'express'

export function asExpressMiddleware (app, handler) {
  const router = express.Router()

  app.routes().forEach((route) => {
    const method = route.method.toLowerCase()
    router[method](route.path, (req, res) => handler({ req, res, route }))
  })

  return router
}
