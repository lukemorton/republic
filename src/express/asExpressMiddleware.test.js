import supertest from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import { asExpressMiddleware } from './'
import Republic, { route } from '../republic'
const { GET, POST } = route

describe('asExpressMiddleware', () => {
  const pageRoute = GET('/api/blog/posts', 'api/blog#posts')
  const postRoute = POST('/api/blog/posts/new', 'api/blog#posts')
  const app = new Republic(pageRoute, postRoute)
  let handler
  let server

  beforeEach(() => {
    handler = jest.fn(({ req, res }) => res.sendStatus(200))
    server = express()
      .use(bodyParser.urlencoded({ extended: true }))
      .use(asExpressMiddleware(app, handler))
  })

  test('it serves route with handler', async () => {
    const res = await supertest(server).get('/api/blog/posts')
    expect(res.statusCode).toBe(200)
  })

  test('it passes route to handler', async () => {
    const res = await supertest(server).get('/api/blog/posts')
    expect(handler).toBeCalledWith(expect.objectContaining({ route: pageRoute }))
  })

  test('it passes req.body to handler', async () => {
    const res = await supertest(server).post('/api/blog/posts/new').send('react=fun')
    expect(handler).toBeCalledWith(expect.objectContaining({ react: 'fun' }))
  })
})
