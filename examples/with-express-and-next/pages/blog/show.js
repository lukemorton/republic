import React from 'react'
import { Link } from 'republic/react'
import app from '../../app'
import Post from '../../components/blog/Post'

const PostTitle = ({ title }) =>
  <h1>{title}</h1>

const BackToList = () =>
  <Link action='blog#index'>
    <a>Back</a>
  </Link>

export default app.page(({ post }) =>
  <div>
    <main>
      <Post Title={PostTitle} LinkBack={BackToList} post={post} />
    </main>
  </div>
)
