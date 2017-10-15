export default function nextHandler (nextApp) {
  return function ({ req, res, route, params }) {
    const pagePath = `/${route.action.replace('#', '/')}`
    const query = { ...params, action: route.action }

    if (route.isPage()) {
      return nextApp.render(req, res, pagePath, query)
    } else {
      return route.handler(params, { req, res, route })
    }
  }
}
