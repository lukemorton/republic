import Republic, { route } from 'republic'
import Router from 'next/router'
import * as blog from './src/blog'

function redirect (res, path, nextPath) {
  if (res) {
    res.redirect(path)
  } else {
    Router.push(nextPath, path)
  }
}

export default new Republic(
  route.page('/', 'blog#index', () => blog.FetchPosts({ limit: 10 })),

  route.page('/post/:slug', 'blog#show', ({ params, res }) => {
    const { post } = blog.FetchPostBySlug({ slug: params.slug })

    if (post) {
      return { post }
    }

    redirect(res, '/', {
      pathname: '/blog/index',
      query: { action: 'blog#index' }
    })
  }),

  route.POST('/subscribe', 'blog#subscribe', async ({ params, res }) => {
    await blog.Subscribe({ subscription: params.subscription })
    redirect(res, '/', {
      pathname: '/blog/index',
      query: { action: 'blog#index' }
    })
  })
)
