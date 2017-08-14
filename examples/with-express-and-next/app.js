import Upcoming, { route } from 'upcoming'
import Router from 'next/router'
import * as blog from './src/blog'

function isomorphicRedirect (res, path, nextPath) {
  if (res) {
    res.redirect(path)
  } else {
    Router.push(nextPath, path)
  }
}

export default new Upcoming(
  route.page('/', 'blog#index', [
    () => blog.FetchPosts({ limit: 10 })
  ]),
  route.page('/post/:slug', 'blog#show', [
    ({ query, res }) => {
      const { post } = blog.FetchPostBySlug({ slug: query.slug })

      if (post) {
        return { post }
      }

      isomorphicRedirect(res, '/', {
        pathname: '/blog/index',
        query: { action: 'blog#index' }
      })
    }
  ]),
  route.POST('/subscribe', 'blog#subscribe', [
    async ({ subscription, res }) => {
      await blog.Subscribe({ subscription })
      isomorphicRedirect(res, '/', {
        pathname: '/blog/index',
        query: { action: 'blog#index' }
      })
    }
  ])
)
