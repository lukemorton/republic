import React from 'react'

export function wrapPage (app, Component) {
  return class extends React.Component {
    static displayName = `Page(${Component.displayName || Component.name})`

    static getInitialProps ({ query }) {
      const handler = app.actionHandler(query.action)

      if (handler) {
        return handler()
      }

      return {}
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
