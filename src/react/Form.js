import React from 'react'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import get from 'lodash.get'

export default class Form extends React.Component {
  static contextTypes = {
    app: PropTypes.object
  }

  static childContextTypes = {
    onChange: PropTypes.func,
    value: PropTypes.func
  }

  componentWillMount () {
    this.state = { values: this.props.values || {} }
  }

  getChildContext () {
    return {
      onChange: this.handleChange.bind(this),
      value: this.value.bind(this)
    }
  }

  app () {
    return this.props.app || this.context.app
  }

  route () {
    return this.app().route(this.props.action)
  }

  handleChange (name, value) {
    let values = { ...this.state.values }
    set(values, name, value)
    this.setState({ values })
  }

  values () {
    return this.state.values
  }

  value (name) {
    return get(this.state.values, name)
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
