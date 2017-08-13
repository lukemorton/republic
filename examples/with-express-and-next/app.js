import Upcoming, { route } from 'upcoming'
import * as blog from './src/blog'

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

      res.redirect('/')
    }
  ]),
  route.POST('/subscribe', 'blog#subscribe', [
    async ({ req, res }) => {
      await blog.Subscribe({ subscription: req.body })
      res.redirect('/')
    }
  ])
)
