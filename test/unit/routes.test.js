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
      test('it returns undefined', async () => {
        const route = routes.page('/', 'blog#index')
        expect(await route.handler()).toBeUndefined()
      })
    })

    describe('and one callback provided', () => {
      test('it returns callback return value', async () => {
        const expectedReturn = { cool: true }
        const route = routes.page('/', 'blog#index', [
          () => expectedReturn
        ])
        expect(await route.handler()).toEqual(expectedReturn)
      })
    })

    describe('and one callback provided', () => {
      test('it returns callback return value', async () => {
        const expectedReturn1 = { bob: true }
        const expectedReturn2 = { cat: true }
        const route = routes.page('/', 'blog#index', [
          ({ props }) => expectedReturn1,
          ({ props }) => ({ ...props, ...expectedReturn2 })
        ])
        expect(await route.handler()).toEqual({ ...expectedReturn1, ...expectedReturn2 })
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
