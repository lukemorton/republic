import express from 'express'

export function asExpressMiddleware (app, handler) {
  const router = express.Router()

  app.routes().forEach((route) => {
    console.log('Serving', route.method, route.path, 'with', route.action)
    const method = route.method.toLowerCase()
    router[method](route.path, (req, res) => handler({ req, res, route }))
  })

  return router
}
