import * as route from './routes'

export { route }

export default class Upcoming {
  constructor (...routes) {
    this._routes = routes
  }

  routes () {
    return this._routes
  }

  route (action) {
    return routesByAction(this.routes())[action]
  }

  routeHandler (action) {
    return this.route(action).handler
  }
}

function routesByAction (routes) {
  let routesByAction = {}

  routes.forEach((route) => {
    routesByAction[route.action] = route
  })

  return routesByAction
}
