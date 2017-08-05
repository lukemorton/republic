import express from 'express'
import { parse } from 'url'
import { asExpressMiddleware } from 'upcoming/express'
import app from './app'

export function createServer (nextApp) {
  return express()
    .use(
      asExpressMiddleware(app, ({ req, res, route }) => {
        const pagePath = `/${route.action.replace('#', '/')}`
        return nextApp.render(req, res, pagePath, { route })
      })
    )
    .get('*', (req, res) => nextApp.render(req, res, parse(req.url)))
}
