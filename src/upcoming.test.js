import Upcoming, { route } from './upcoming'

describe('Upcoming', () => {
  test('module exposes route', () => {
    expect(route).toBeTruthy()
  })

  describe('when initialising new application', () => {
    test('it sets routes', () => {
      const routes = ['cool', 'bob']
      const app = new Upcoming(...routes)
      expect(app.routes()).toContain(routes[0])
      expect(app.routes()).toContain(routes[1])
    })
  })

  describe('when building actions', () => {
    test('it registers actions', () => {
      const route = { action: 'blog#index', handler: jest.fn() }
      const app = new Upcoming(route)
      expect(app.route('blog#index')).toBe(route)
    })
  })

  describe('when retrieving a route handler', () => {
    test('it returns handler for action', () => {
      const route = { action: 'blog#index', handler: jest.fn() }
      const app = new Upcoming(route)
      expect(app.routeHandler('blog#index')).toBe(route.handler)
    })
  })
})
