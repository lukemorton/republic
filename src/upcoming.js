import * as routes from './routes'

export { routes }

export default class Upcoming {
  constructor (...middleware) {
    this.middleware = middleware
  }

  actions () {
    let actions = {}

    this.middleware.forEach(({ module, name, action }) => {
      actions[module] = actions[module] || {}
      actions[module][name] = action
    })

    return actions
  }
}
