import React from 'react'
import Router from 'next/router'
import { wrapPage, Link } from 'upcoming/next'
import { Form, Input } from 'upcoming/react'
import app from '../../app'

const Post = (app) => ({ title, slug }, i) =>
  <li key={i}>
    <Link action='blog#show' params={{ slug }}>
      <a>{title}</a>
    </Link>
  </li>

export default wrapPage(app, ({ posts, subscribe }) =>
  <div>
    <main>
      <h1>Welcome</h1>

      <div>
        <h2>Blog posts</h2>

        <ul>
          {posts.map(Post(app))}
          {Post({ title: "ob", slug: "ob" }, 3)}
        </ul>
      </div>
    </main>
    <aside>
      <Form action={subscribe}>
        <p>
          <label htmlFor='email'>Subscribe your email address:</label>
          <Input type='text' name='subscription.email' id='email' />
        </p>
        <p>
          <button>Subscribe</button>
        </p>
      </Form>
    </aside>
  </div>
)
