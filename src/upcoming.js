import * as routes from './routes'

export { routes }

export default class Upcoming {
  constructor (...middleware) {
    this.middleware = middleware
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
