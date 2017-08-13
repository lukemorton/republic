import FetchPosts from './FetchPosts'

export default function FetchPostBySlug ({ slug }) {
  const { posts } = FetchPosts({ limit: 100 })

  for (let post of posts) {
    if (post.slug === slug) {
      return { post }
    }
  }

  return { post: undefined }
}
