import React from 'react'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import get from 'lodash.get'

export default class Form extends React.Component {
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
    this.props.action(this.values())
  }

  buildProps () {
    const { method, path } = this.props.action

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
