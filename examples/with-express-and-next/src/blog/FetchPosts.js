export default function FetchPosts ({ limit }) {
  return {
    posts: [
      { title: 'First blog post', slug: 'first' },
      { title: 'Another blog post', slug: 'second' }
    ]
  }
}
