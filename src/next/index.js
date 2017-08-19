import React from 'react'
import wrapPage from './wrapPage'
import Link from './Link'
import createRedirectTo from './createRedirectTo'
import RepublicBase, { route } from '../republic'

export { wrapPage, Link, route }

export default class Republic extends RepublicBase {
  routes () {
    return this._routes.map((route) => {
      return {
        ...route,
        originalHandler: route.handler,
        handler: wrapNextMagic(this, route.handler)
      }
    })
  }

  page (Component) {
    return wrapPage(this, Component)
  }

  buildLink (props) {
    return <Link {...props} />
  }
}

function wrapNextMagic (app, originalHandler) {
  function wrappedHandler (params, ctx = {}) {
    const redirectTo = createRedirectTo(app, ctx.res)
    return originalHandler(params, { ...ctx, redirectTo })
  }
  wrappedHandler.method = originalHandler.method
  wrappedHandler.path = originalHandler.path
  return wrappedHandler
}
