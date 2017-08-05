import React from 'react'

export function wrapPage (app, Component) {
  return class extends React.Component {
    static getInitialProps () {
      return {}
    }

    render () {
      return <Component {...this.props} />
    }
  }
}
