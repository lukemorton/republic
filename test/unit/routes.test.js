import sinon from 'sinon'
import * as routes from '../../src/routes'

describe('routes', () => {
  describe('when defining route', () => {
    test('it returns module and name', () => {
      const route = routes.page('/', 'blog#index')
      expect(route.module).toBe('blog')
      expect(route.name).toBe('index')
    })

    describe('and no callbacks provided', () => {
      test('it returns undefined', () => {
        const route = routes.page('/', 'blog#index')
        expect(route.handler()).toBeUndefined()
      })
    })

    describe('and one callback provided', () => {
      test('it returns callback return value', () => {
        const expectedReturn = { cool: true }
        const route = routes.page('/', 'blog#index', [() => expectedReturn])
        expect(route.handler()).toBe(expectedReturn)
      })
    })
  })

  describe('page', () => {
    const route = routes.page('/', 'blog#index')
    test('it is GET', () => expect(route.method).toBe('GET'))
  })

  describe('GET', () => {
    const route = routes.GET('/', 'blog#index')
    test('it is GET', () => expect(route.method).toBe('GET'))
  })

  describe('POST', () => {
    const route = routes.POST('/', 'blog#subscribe')
    test('it is POST', () => expect(route.method).toBe('POST'))
  })

  describe('DELETE', () => {
    const route = routes.DELETE('/', 'blog#deletePost')
    test('it is DELETE', () => expect(route.method).toBe('DELETE'))
  })
})
