export default function FetchPosts ({ limit }) {
  return {
    posts: [
      {
        title: 'First blog post',
        slug: 'first',
        content: 'A very nice content'
      },
      {
        title: 'Another blog post',
        slug: 'second',
        content: 'A very nice content'
      }
    ]
  }
}
