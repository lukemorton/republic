import Upcoming, { routes } from '../../src/upcoming'

describe('Upcoming', () => {
  test('module exposes routes', () => {
    expect(routes).toBeTruthy()
  })

  describe('when initialising new application', () => {
    test('it sets middleware', () => {
      const middleware = ['cool', 'bob']
      const app = new Upcoming(...middleware)
      expect(app.middleware).toContain(middleware[0])
      expect(app.middleware).toContain(middleware[1])
    })
  })

  describe('when building actions', () => {
    test('it registers actions', () => {
      const middleware = { action: 'blog#index', handler: jest.fn() }
      const app = new Upcoming(middleware)
      expect(app.actions()['blog#index']).toBe(middleware.handler)
    })
  })

  describe('when retrieving an action handler', () => {
    test('it returns handler for action', () => {
      const middleware = { action: 'blog#index', handler: jest.fn() }
      const app = new Upcoming(middleware)
      expect(app.actionHandler('blog#index')).toBe(middleware.handler)
    })
  })
})
