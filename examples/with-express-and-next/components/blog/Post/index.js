import React from 'react'

export default ({ Title, LinkBack, post }) =>
  <article>
    <Title {...post} />

    <div>
      {post.content}
    </div>

    <LinkBack />
  </article>
