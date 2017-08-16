import React from 'react'
import { wrapPage } from 'upcoming/next'
import app from '../../app'
import PostList from '../../components/blog/Post/List'
import SubscriptionForm from '../../components/blog/Subscription/Form'

export default wrapPage(app, ({ posts, subscribe }) =>
  <div>
    <main>
      <h1>Welcome</h1>

      <PostList
        title={<h2>Blog posts</h2>}
        posts={posts}
        />
    </main>

    <aside>
      <SubscriptionForm subscribe={subscribe} />
    </aside>
  </div>
)
