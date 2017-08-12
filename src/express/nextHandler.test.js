import { nextHandler } from './'

describe('nextHandler', () => {
  const req = { params: { exampleParam: 'cool' }, query: { exampleQuery: true } }
  const res = {}
  let next
  let route

  beforeEach(() => {
    next = { render: jest.fn() }
  })

  function createPageRoute () {
    return { action: 'blog#index', handler () {}, isPage: () => true }
  }

  function createActionRoute () {
    return { action: 'blog#create', handler: jest.fn(), isPage: () => false }
  }

  test('it renders pages with next', () => {
    const adapter = nextHandler(next)
    adapter({ req, res, route: createPageRoute() })

    expect(next.render).toBeCalledWith(
      req,
      res,
      '/blog/index',
      { exampleQuery: true, exampleParam: 'cool', action: 'blog#index' }
    )
  })

  test('it handles actions with route handler', () => {
    const adapter = nextHandler(next)
    const route = createActionRoute()
    adapter({ req, res, route })

    expect(route.handler).toBeCalledWith({
      req,
      res,
      query: { exampleQuery: true, exampleParam: 'cool', action: 'blog#create' }
    })
  })
})
