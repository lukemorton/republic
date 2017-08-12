import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

function hrefFor (action, params) {
  return {
    pathname: `/${action.replace('#', '/')}`,
    query: { action, ...params }
  }
}

const Link = (props, context) => {
  const app = context.app || props.app
  const { action, params, ...nextLinkProps } = props
  const href = hrefFor(action, params)
  const as = app.url(action, params)
  return <NextLink href={href} as={as} {...nextLinkProps} />
}

Link.contextTypes = {
  app: PropTypes.object
}

export default Link
