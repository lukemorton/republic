import Republic, { route } from './republic'

describe('Republic', () => {
  test('module exposes route', () => {
    expect(route).toBeTruthy()
  })

  test('it provides routes', () => {
    const routes = ['cool', 'bob']
    const app = new Republic(...routes)
    expect(app.routes()).toContain(routes[0])
    expect(app.routes()).toContain(routes[1])
  })

  test('it provides single route for action', () => {
    const route = { action: 'blog#index', handler () {} }
    const app = new Republic(route)
    expect(app.route('blog#index')).toBe(route)
  })

  test('it returns handler for action', () => {
    const route = { action: 'blog#index', handler () {} }
    const app = new Republic(route)
    expect(app.routeHandler('blog#index')).toBe(route.handler)
  })

  test('it returns route handlers by module and name', () => {
    const route = { action: 'blog#subscribe', handler () {} }
    const app = new Republic(route)
    expect(app.routeHandlersByModuleAndName()).toMatchObject({
      blog: { subscribe: route.handler }
    })
  })
})
