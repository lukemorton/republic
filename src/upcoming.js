import pathToRegexp from 'path-to-regexp'
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

  url (action, params) {
    const route = this.route(action)

    if (route) {
      return pathToRegexp.compile(route.path)(params)
    }
  }
}

function routesByAction (routes) {
  let routesByAction = {}

  routes.forEach((route) => {
    routesByAction[route.action] = route
  })

  return routesByAction
}
