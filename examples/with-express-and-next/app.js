import Republic, { route } from 'republic/next'
import * as blog from './src/blog'

export default new Republic(
  route.page('/', 'blog#index', () => {
    return blog.FetchPosts({ limit: 10 })
  }),

  route.page('/post/:slug', 'blog#show', ({ params, redirectTo }) => {
    console.log('params', params)
    const { post } = blog.FetchPostBySlug({ slug: params.slug })

    if (post) {
      return { post }
    }

    redirectTo('blog#index')
  }),

  route.POST('/subscribe', 'blog#subscribe', async ({ params, redirectTo }) => {
    console.log(params)
    await blog.Subscribe({ subscription: params.subscription })
    redirectTo('blog#index')
  })
)
