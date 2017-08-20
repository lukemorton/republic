import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import set from 'lodash.set'
import update from 'lodash.update'
import union from 'lodash.union'
import without from 'lodash.without'

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

  handleChange (name, value, options = {}) {
    let values = { ...this.state.values }

    if (options.type === 'checkbox') {
      if (name.indexOf('[]') > -1) {
        name = name.replace('[]', '')

        if (options.checked === true) {
          update(values, name, (v) => union(v, [value]))
        } else {
          update(values, name, (v) => without(v, value))
        }
      } else {
        if (options.checked === true) {
          set(values, name, value)
        } else {
          set(values, name, '')
        }
      }
    } else {
      set(values, name, value)
    }

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
