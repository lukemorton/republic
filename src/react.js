import React from 'react'

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

export const Form = ({ app, action, children }) =>
  <form {...buildFormProps(app, action)}>
    {children}
  </form>

export const Input = (props) =>
  <input {...props} />
