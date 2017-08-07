import supertest from 'supertest'
import { createServer } from '../../examples/with-express-and-next/server'

describe('Application with express and next', () => {
  let nextApp
  let res

  beforeEach(async () => {
    nextApp = { render: jest.fn(({ req, res }) => res.sendStatus(200)) }
    res = await supertest(await createServer(nextApp)).get('/')
  })

  test('it serves route with handler', () => {
    expect(res.statusCode).toBe(200)
  })

  test('it passes route to handler', () => {
    expect(nextApp.render).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      '/blog/index',
      expect.objectContaining({ action: 'blog#index' })
    )
  })
})
