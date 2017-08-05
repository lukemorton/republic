import React from 'react'
import { wrapPage } from 'upcoming/next'
import app from '../../app'

export default wrapPage(app, ({ posts }) =>
  <div>
    <main>
      <h1>Welcome</h1>

      <div>
        <h2>Blog posts</h2>
        {posts.map(({ title }) => <div>{title}</div>)}
      </div>
    </main>
  </div>
)
