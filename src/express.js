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

export function nextHandler (nextApp) {
  return function ({ req, res, route }) {
    const pagePath = `/${route.action.replace('#', '/')}`
    const query = {
      ...req.query,
      ...req.params,
      action: route.action
    }

    if (route.isPage()) {
      return nextApp.render(req, res, pagePath, query)
    } else {
      return route.handler({ req, res, query })
    }
  }
}
