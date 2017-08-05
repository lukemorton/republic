import Upcoming, { route } from '../../src/upcoming'

export default new Upcoming(
  route.page('/', 'blog#index')
)
