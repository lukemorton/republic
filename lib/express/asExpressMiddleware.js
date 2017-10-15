import express from 'express'

function wrapHandler (handler) {
  return function ({ req, res, route }) {
    let ctx = { req, res, route }

    if (route.isPage()) {
      ctx.params = { ...req.query, ...req.params }
    } else {
      ctx.params = { ...req.query, ...req.params, ...req.body }
    }

    return handler(ctx)
  }
}

export default function asExpressMiddleware (app, handler) {
  const router = express.Router()

  app.routes().forEach((route) => {
    console.log('Serving', route.method, route.path, 'with', route.action)
    const method = route.method.toLowerCase()
    router[method](route.path, (req, res) => wrapHandler(handler)({ req, res, route }))
  })

  return router
}
