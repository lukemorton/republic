import sinon from 'sinon'
import * as Routes from '../../src/routes'

describe('Routes', () => {
  describe('page', () => {
    const route = Routes.page('/', 'blog#index')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('index')
    })
  })

  describe('GET', () => {
    const route = Routes.GET('/', 'blog#index')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('index')
    })
  })

  describe('POST', () => {
    const route = Routes.GET('/', 'blog#subscribe')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('subscribe')
    })
  })

  describe('DELETE', () => {
    const route = Routes.GET('/', 'blog#deletePost')

    test('it returns module and name', () => {
      expect(route.module).toBe('blog')
      expect(route.name).toBe('deletePost')
    })
  })
})
