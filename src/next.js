import React from 'react'

export function wrapPage (app, Component) {
  return class extends React.Component {
    static displayName = `Page(${Component.displayName || Component.name})`

    static async getInitialProps (ctx) {
      const { route, params, query } = ctx.query

      if (route.handler) {
        const props = await route.handler({ ...ctx, route, params, query })

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
