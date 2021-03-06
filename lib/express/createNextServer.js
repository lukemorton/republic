import path from 'path'
import express from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import asExpressMiddleware from './asExpressMiddleware'
import nextHandler from './nextHandler'

export function createExpressServer (app, nextApp) {
  const server = express()

  // Handle POST data
  server.use(bodyParser.urlencoded({ extended: true }))

  // Hook up upcoming + express + next
  server.use(asExpressMiddleware(app, nextHandler(nextApp)))

  // Handle 404s and other non-upcoming pages
  server.get('*', (req, res) => nextApp.getRequestHandler()(req, res))

  return server
}

export default async function createNextServer ({ app, dev }) {
  const nextApp = next({ dir: '.', dev })
  await nextApp.prepare()
  return createExpressServer(app, nextApp)
}
