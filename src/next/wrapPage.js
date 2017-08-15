import React from 'react'
import PropTypes from 'prop-types'

export default function wrapPage (app, Component) {
  return class extends React.Component {
    static displayName = `Page(${Component.displayName || Component.name})`

    static async getInitialProps (ctx) {
      const { query } = ctx
      const route = app.route(query.action)

      if (!route || !route.handler) {
        throw 'Page did not match route'
      }

      const actions = app.routeHandlersByModuleAndName()
      const localActions = actions[route.module]
      const props = await route.handler({ ...ctx, route, query })

      if (props) {
        return {
          actions,
          ...localActions,
          ...props
        }
      } else {
        return {
          actions,
          ...localActions
        }
      }
    }

    static childContextTypes = {
      app: PropTypes.object
    }

    getChildContext () {
      return { app }
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
