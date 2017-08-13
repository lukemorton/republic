import express from 'express'
import bodyParser from 'body-parser'
import { asExpressMiddleware, nextHandler } from 'upcoming/express'
import app from './app'

export function createServer (nextApp) {
  const server = express()

  // Handle POST data
  server.use(bodyParser.urlencoded({ extended: true }))

  // Hook up upcoming + express + next
  server.use(asExpressMiddleware(app, nextHandler(nextApp)))

  // Handle 404s and other non-upcoming pages
  server.get('*', (req, res) => nextApp.getRequestHandler()(req, res))

  return server
}
