import React from 'react'
import { shallow } from 'enzyme'
import { Link } from './'
import Republic from '../republic'

describe('Link', () => {
  const app = new Republic({
    path: '/blog',
    action: 'blog#index'
  }, {
    path: '/blog/:slug',
    action: 'blog#show'
  })

  app.buildLink = function ({ url, children }) {
    return <a href={url}>{children}</a>
  }

  describe('when building a link', () => {
    test('it correctly builds href', () => {
      const link = shallow(<Link app={app} action='blog#index'><a>Blog</a></Link>)
      expect(link).toHaveProp('href', '/blog')
    })

    test('it correctly builds href with params', () => {
      const link = shallow(<Link app={app} action='blog#show' params={{ slug: 'awesome-post' }}><a>Blog</a></Link>)
      expect(link).toHaveProp('href', '/blog/awesome-post')
    })
  })

  describe('when provided app via context', () => {
    test('it correctly builds link', () => {
      shallow(<Link action='blog#index'><a>Blog</a></Link>, { context: { app } })
    })
  })
})
