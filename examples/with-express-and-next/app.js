import Upcoming, { route } from 'upcoming'
import * as blog from './src/blog'

export default new Upcoming(
  route.page('/', 'blog#index', [() => blog.FetchPosts({ limit: 10 })])
)
