import Republic, { route } from 'republic/next'

export default new Republic(
  route.page('/', 'blog#index')
)
