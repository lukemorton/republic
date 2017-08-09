import supertest from 'supertest'
import express from 'express'
import { asExpressMiddleware, nextHandler } from '../../src/express'
import Upcoming, { route } from '../../src/upcoming'
const { GET } = route

describe('asExpressMiddleware', () => {
  const route = GET('/api/blog/posts', 'api/blog#posts')
  const app = new Upcoming(route)
  let handler
  let server

  beforeEach(() => {
    handler = jest.fn(({ req, res }) => res.sendStatus(200))
    server = express().use(asExpressMiddleware(app, handler))
  })

  test('it serves route with handler', async () => {
    const res = await supertest(server).get('/api/blog/posts')
    expect(res.statusCode).toBe(200)
  })

  test('it passes route to handler', async () => {
    const res = await supertest(server).get('/api/blog/posts')
    expect(handler).toBeCalledWith(expect.objectContaining({ route }))
  })
})

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
