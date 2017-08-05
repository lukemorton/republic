import sinon from 'sinon'
import * as routes from '../../src/routes'

describe('routes', () => {
  describe('page', () => {
    const route = routes.page('/', 'blog#index')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('index')
    })
  })

  describe('GET', () => {
    const route = routes.GET('/', 'blog#index')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('index')
    })
  })

  describe('POST', () => {
    const route = routes.GET('/', 'blog#subscribe')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('subscribe')
    })
  })

  describe('DELETE', () => {
    const route = routes.GET('/', 'blog#deletePost')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('deletePost')
    })
  })
})
