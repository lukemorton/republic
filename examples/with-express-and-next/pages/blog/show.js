import React from 'react'
import { wrapPage, Link } from 'upcoming/next'
import app from '../../app'

export default wrapPage(app, ({ post }) =>
  <div>
    <main>
      <h1>{post.title}</h1>

      <Link action='blog#index'>
        <a>Back</a>
      </Link>
    </main>
  </div>
)
