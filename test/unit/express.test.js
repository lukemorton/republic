import supertest from 'supertest'
import express from 'express'
import { asExpressMiddleware } from '../../src/express'
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
