import React from 'react'
import PropTypes from 'prop-types'

export default class Form extends React.Component {
  static contextTypes = {
    app: PropTypes.object
  }

  static childContextTypes = {
    onChange: PropTypes.func
  }

  componentWillMount () {
    this.state = { values: {} }
  }

  getChildContext () {
    return { onChange: this.handleChange.bind(this) }
  }

  app () {
    return this.props.app || this.context.app
  }

  route () {
    return this.app().route(this.props.action)
  }

  handleChange (name, value) {
    this.setState({
      values: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  values () {
    return this.state.values
  }

  handleSubmit (e) {
    e.preventDefault()
    this.route().handler(this.values())
  }

  buildProps () {
    const { method, path } = this.route()

    return {
      method,
      action: path,
      onSubmit: this.handleSubmit.bind(this)
    }
  }

  render () {
    return (
      <form {...this.buildProps()}>
        {this.props.children}
      </form>
    )
  }
}
