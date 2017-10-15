import React from 'react'
import PropTypes from 'prop-types'

const Link = (props, context) => {
  const app = context.app || props.app
  const url = app.url(props.action, props.params)
  return app.buildLink({ ...props, url })
}

Link.contextTypes = {
  app: PropTypes.object
}

export default Link
