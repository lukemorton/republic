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

      const props = await route.handler({ ...ctx, route, query })

      if (props) {
        return { ...props, action: query.action }
      } else {
        return { action: query.action }
      }
    }

    static childContextTypes = {
      app: PropTypes.object
    }

    getChildContext () {
      return { app }
    }

    render () {
      const actions = app.routeHandlersByModuleAndName()
      const route = app.route(this.props.action)
      const localActions = actions[route.module]
      return <Component actions={actions} {...localActions} {...this.props} />
    }
  }
}
