import Router from 'next/router'
import createRedirectTo from './createRedirectTo'

describe('createRedirectTo()', () => {
  describe('when res provided', () => {
    test('it uses app to build URL', () => {
      const app = { url: jest.fn(() => '/blog') }
      const res = { redirect () {} }
      createRedirectTo(app, res)('blog#index', {})
      expect(app.url).toBeCalledWith('blog#index', {})
    })

    test('it uses res to redirect', () => {
      const app = { url () { return '/blog' } }
      const res = { redirect: jest.fn() }
      createRedirectTo(app, res)('blog#index')
      expect(res.redirect).toBeCalledWith('/blog')
    })
  })

  describe('when res not provided', () => {
    let originalPush

    beforeEach(() => {
      originalPush = Router.push
      Router.push = jest.fn()
    })

    afterEach(() => {
      Router.push = originalPush
    })

    test('it uses app to build URL', () => {
      const app = { url: jest.fn(() => '/blog') }
      createRedirectTo(app)('blog#index', {})
      expect(app.url).toBeCalledWith('blog#index', {})
    })

    test('it uses Router.push to redirect', () => {
      const app = { url () { return '/blog' } }
      createRedirectTo(app)('blog#index')
      expect(Router.push).toBeCalledWith(
        expect.objectContaining({ pathname: '/blog/index' }),
        '/blog'
      )
    })
  })
})
