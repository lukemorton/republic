import * as route from './routes'

export { route }

export default class Upcoming {
  constructor (...middleware) {
    this.middleware = middleware
  }

  routes () {
    return this.middleware
  }

  actions () {
    let actions = {}

    this.middleware.forEach(({ action, handler }) => {
      actions[action] = handler
    })

    return actions
  }

  actionHandler (action) {
    return this.actions()[action]
  }
}
