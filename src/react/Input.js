import React from 'react'
import PropTypes from 'prop-types'

function buildInputProps (props, context) {
  const { name } = props

  if (!name) {
    throw 'Please give this input a name'
  }

  return {
    ...props,
    onChange: buildOnChange(props, context)
  }
}

function buildOnChange (props, context) {
  if (props.onChange) return props.onChange
  else if (!context.onChange) return () => null

  return function ({ target }) {
    context.onChange(props.name, target.value)
  }
}

const Input = (props, context) =>
  <input {...buildInputProps(props, context)} />

Input.contextTypes = {
  onChange: PropTypes.func
}

export default Input
