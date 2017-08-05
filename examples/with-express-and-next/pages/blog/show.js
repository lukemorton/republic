import React from 'react'
import { wrapPage } from 'upcoming/next'
import app from '../../app'

export default wrapPage(app, ({ post }) =>
  <div>
    <main>
      <h1>{post.title}</h1>

      <a href="/">Back</a>
    </main>
  </div>
)
