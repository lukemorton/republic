import React from 'react'
import PropTypes from 'prop-types'

function buildFormProps (app, action) {
  const route = app.route(action)
  return {
    method: route.method,
    action: route.path,
    onSubmit (e) {
      e.preventDefault()
      route.handler()
    }
  }
}

export const Form = ({ app, action, children }, context) =>
  <form {...buildFormProps(context.app || app, action)}>
    {children}
  </form>

Form.contextTypes = {
  app: PropTypes.object
}

export const Input = (props) =>
  <input {...props} />
