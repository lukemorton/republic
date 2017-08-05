import React from 'react'
import Link from 'next/link'
import { wrapPage } from 'upcoming/next'
import app from '../../app'

const Post = ({ title, slug }, i) =>
  <li key={i}>
    <a href={`/post/${slug}`}>{title}</a>
  </li>

export default wrapPage(app, ({ posts }) =>
  <div>
    <main>
      <h1>Welcome</h1>

      <div>
        <h2>Blog posts</h2>

        <ul>
          {posts.map(Post)}
        </ul>
      </div>
    </main>
  </div>
)
