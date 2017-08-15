import sinon from 'sinon'
import * as routes from './routes'

describe('routes', () => {
  describe('when defining route', () => {
    test('it returns module and name', () => {
      const route = routes.page('/', 'blog#index')
      expect(route.module).toBe('blog')
      expect(route.name).toBe('index')
    })

    test('it defines method and path on handler', () => {
      const { handler } = routes.page('/', 'blog#index')
      expect(handler.method).toBe('GET')
      expect(handler.path).toBe('/')
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

    describe('and two callbacks provided', () => {
      test('it not continue stack if next not called', async () => {
        const route = routes.page('/', 'blog#index', [
          (next) => (ctx) => ({ bob: true }),
                    (ctx) => ({ cat: true })
        ])
        expect(await route.handler({})).toEqual({ bob: true })
      })

      test('it continues stack once next called', async () => {
        const route = routes.page('/', 'blog#index', [
          (next) => (ctx) => ({ bob: true, ...next(ctx) }),
                    (ctx) => ({ cat: true })
        ])

        expect(await route.handler({})).toEqual({ bob: true, cat: true })
      })
    })

    describe('and three callbacks provided', () => {
      test('it continues stack once next called', async () => {
        const route = routes.page('/', 'blog#index', [
          (next) => (ctx) => ({ bob: true, ...next(ctx) }),
          (next) => (ctx) => ({ cat: true, ...next(ctx) }),
                    (ctx) => ({ dog: true })
        ])

        expect(await route.handler({})).toEqual({ bob: true, cat: true, dog: true })
      })
    })

    describe('and four callbacks provided', () => {
      test('it continues stack once next called', async () => {
        const route = routes.page('/', 'blog#index', [
          (next) => async (ctx) => ['bob', ...await next(ctx)],
          (next) => async (ctx) => ['cat', ...await next(ctx)],
          (next) => async (ctx) => ['dog', ...await next(ctx)],
                    async (ctx) => ['fox']
        ])

        expect(await route.handler({})).toEqual(['bob', 'cat', 'dog', 'fox'])
      })
    })
  })

  describe('page', () => {
    const route = routes.page('/', 'blog#index')
    test('it is GET', () => expect(route.method).toBe('GET'))
    test('it isPage()', () => expect(route.isPage()).toBe(true))
  })

  describe('GET', () => {
    const route = routes.GET('/', 'blog#index')
    test('it is GET', () => expect(route.method).toBe('GET'))
    test('isPage() === false', () => expect(route.isPage()).toBe(false))
  })

  describe('POST', () => {
    const route = routes.POST('/', 'blog#subscribe')
    test('it is POST', () => expect(route.method).toBe('POST'))
    test('isPage() === false', () => expect(route.isPage()).toBe(false))
  })

  describe('DELETE', () => {
    const route = routes.DELETE('/', 'blog#deletePost')
    test('it is DELETE', () => expect(route.method).toBe('DELETE'))
    test('isPage() === false', () => expect(route.isPage()).toBe(false))
  })
})
