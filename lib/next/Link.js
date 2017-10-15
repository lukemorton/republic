import React from 'react'
import NextLink from 'next/link'
import href from './href'

const Link = (props, context) => {
  const { action, params, url, ...nextLinkProps } = props

  return (
    <NextLink
      href={href(action, params)}
      as={url}
      {...nextLinkProps}
      />
  )
}

export default Link
