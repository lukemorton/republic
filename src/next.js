import React from 'react'

export function wrapPage (app, Component) {
  return class extends React.Component {
    static displayName = `Page(${Component.displayName || Component.name})`

    static getInitialProps (ctx) {
      const { query } = ctx
      const handler = app.routeHandler(query.route && query.route.action)

      if (handler) {
        return handler(ctx) || {}
      }

      return {}
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
