import React from 'react'
import { shallow } from 'enzyme'
import { Link } from './'
import Upcoming from '../upcoming'

describe('Link', () => {
  const app = new Upcoming({
    path: '/blog',
    action: 'blog#index'
  })

  describe('when building a link', () => {
    test('it correctly builds href', () => {
      const link = shallow(<Link app={app} action='blog#index'><a>Blog</a></Link>)
      expect(link).toHaveProp('href', {
        pathname: '/blog/index',
        query: { action: 'blog#index' }
      })
    })

    test('it correctly builds as', () => {
      const link = shallow(<Link app={app} action='blog#index'><a>Blog</a></Link>)
      expect(link).toHaveProp('as', '/blog')
    })
  })

  describe('when provided app via context', () => {
    test('it correctly builds link', () => {
      shallow(<Link action='blog#index'><a>Blog</a></Link>, { context: { app } })
    })
  })
})
