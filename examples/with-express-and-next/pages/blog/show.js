import React from 'react'
import { wrapPage, Link } from 'upcoming/next'
import app from '../../app'
import Post from '../../components/blog/Post'

const PostTitle = ({ title }) =>
  <h1>{title}</h1>

const BackToList = () =>
  <Link action='blog#index'>
    <a>Back</a>
  </Link>

export default wrapPage(app, ({ post }) =>
  <div>
    <main>
      <Post Title={PostTitle} LinkBack={BackToList} post={post} />
    </main>
  </div>
)
