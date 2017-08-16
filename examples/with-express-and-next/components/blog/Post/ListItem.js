import React from 'react'
import { Link } from 'republic/next'

export default ({ title, slug }, i) =>
  <li key={i}>
    <Link action='blog#show' params={{ slug }}>
      <a>{title}</a>
    </Link>
  </li>
