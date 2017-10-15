import supertest from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import { asExpressMiddleware } from './'
import Republic, { route } from '../republic'
const { GET, POST } = route

describe('asExpressMiddleware', () => {
  const postsRoute = GET('/api/blog/posts', 'api/blog/posts#index')
  const showPostsRoute = GET('/api/blog/posts/:id/show', 'api/blog/posts#show')
  const createPostRoute = POST('/api/blog/posts/new', 'api/blog/posts#create')
  const app = new Republic(postsRoute, showPostsRoute, createPostRoute)
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
    expect(handler).toBeCalledWith(expect.objectContaining({ route: postsRoute }))
  })

  test('it passes req.params to handler in params', async () => {
    const res = await supertest(server).get('/api/blog/posts/1/show')
    expect(handler).toBeCalledWith(expect.objectContaining({ params: { id: '1' } }))
  })

  test('it passes req.query to handler in params', async () => {
    const res = await supertest(server).get('/api/blog/posts?testing=true')
    expect(handler).toBeCalledWith(expect.objectContaining({ params: { testing: 'true' } }))
  })

  test('it passes req.body to handler in params', async () => {
    const res = await supertest(server).post('/api/blog/posts/new').send('react=fun')
    expect(handler).toBeCalledWith(expect.objectContaining({ params: { react: 'fun' } }))
  })
})
