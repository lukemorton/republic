import React from 'react'

export function wrapPage (app, Component) {
  return class extends React.Component {
    static displayName = `Page(${Component.displayName || Component.name})`

    static async getInitialProps (ctx) {
      const { query } = ctx
      const route = app.route(query.action)

      if (route) {
        const props = await route.handler({ ...ctx, route, query })

        if (props) {
          return props
        }
      }

      return {}
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
