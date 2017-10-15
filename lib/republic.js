import pathToRegexp from 'path-to-regexp'
import * as route from './routes'

export { route }

export default class Republic {
  constructor (...routes) {
    this._routes = routes
  }

  routes () {
    return this._routes
  }

  route (action) {
    return routesByAction(this.routes())[action]
  }

  routeHandlersByModuleAndName () {
    return routeHandlersByModuleAndName(this.routes())
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

function routeHandlersByModuleAndName (routes) {
  let routesByModuleAndName = {}

  routes.forEach((route) => {
    const [mod, name] = route.action.split('#')
    routesByModuleAndName[mod] = routesByModuleAndName[mod] || {}
    routesByModuleAndName[mod][name] = route.handler
  })

  return routesByModuleAndName
}
