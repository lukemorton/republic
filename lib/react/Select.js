import React from 'react'
import PropTypes from 'prop-types'

function buildSelectProps (props, context) {
  const { name } = props

  if (!name) {
    throw 'Please give this select a name'
  }

  return {
    ...props,
    onChange: buildOnChange(props, context),
    value: buildValue(props, context)
  }
}

function buildOnChange (props, context) {
  if (props.onChange) return props.onChange
  else if (!context.onChange) return () => null

  return function ({ target }) {
    context.onChange(props.name, valuesFromTarget(props, target), {
      multiple: props.multiple
    })
  }
}

function valuesFromTarget (props, target) {
  if (props.multiple) {
    const values = []


    for (const option of target.selectedOptions) {
      values.push(option.value)
    }

    return values
  } else {
    return target.value
  }
}

function buildValue (props, context) {
  if (props.value) {
    return props.value
  } else if (context.value) {
    const value = context.value(props.name)

    if (value) {
      return value
    } else if (props.multiple) {
      return []
    } else {
      return ''
    }
  }
}

const Select = (props, context) =>
  <select {...buildSelectProps(props, context)}>
    {props.children}
  </select>

Select.contextTypes = {
  onChange: PropTypes.func,
  value: PropTypes.func
}

export default Select
