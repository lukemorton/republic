import sinon from 'sinon'
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
      const module = 'blog'
      const name = 'index'
      const middleware = { module, name, action: sinon.spy() }
      const app = new Upcoming(middleware)
      expect(app.actions()[module][name]).toBe(middleware.action)
    })
  })
})
