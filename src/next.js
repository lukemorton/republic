import React from 'react'

export function wrapPage (app, Component) {
  return class extends React.Component {
    static displayName = `Page(${Component.displayName || Component.name})`

    static getInitialProps (ctx) {
      const { route, params, query } = ctx.query

      if (route.handler) {
        return route.handler({ ...ctx, route, params, query }) || {}
      }

      return {}
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
