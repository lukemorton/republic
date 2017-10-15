export default function hrefFor (action, params) {
  return {
    pathname: `/${action.replace('#', '/')}`,
    query: { action, params }
  }
}

import href from './href'

describe('href()', () => {
  test('it builds pathname correctly', () => {
    expect(href('blog#index')).toMatchObject({ pathname: '/blog/index' })
  })

  test('it builds query correctly', () => {
    expect(href('blog#index')).toMatchObject({ query: { action: 'blog#index' } })
    expect(href('blog#show', { id: '1' })).toMatchObject({
      query: { action: 'blog#show', id: '1' }
    })
  })
})
