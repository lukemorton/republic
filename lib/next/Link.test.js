import React from 'react'
import { shallow } from 'enzyme'
import { Link } from './'

describe('Link', () => {
  describe('when building a link', () => {
    test('it correctly builds href', () => {
      const link = shallow(<Link action='blog#index'><a>Blog</a></Link>)
      expect(link).toHaveProp('href', {
        pathname: '/blog/index',
        query: { action: 'blog#index' }
      })
    })

    test('it correctly builds href with params', () => {
      const link = shallow(<Link action='blog#show' params={{ slug: 'awesome-post' }}><a>Blog</a></Link>)
      expect(link).toHaveProp('href', {
        pathname: '/blog/show',
        query: { action: 'blog#show', slug: 'awesome-post' }
      })
    })

    test('it correctly builds as', () => {
      const link = shallow(<Link action='blog#index' url='/blog'><a>Blog</a></Link>)
      expect(link).toHaveProp('as', '/blog')
    })
  })
})
