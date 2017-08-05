import React from 'react'
import { mount } from 'enzyme'
import { wrapPage } from '../../src/next'
import Upcoming from '../../src/upcoming'

describe('wrapPage()', () => {
  describe('when wrapping component with next.js page', () => {
    test('it defines display name with Component.displayName', () => {
      const Component = () => <div>Testing</div>
      Component.displayName = 'CustomName'
      const Page = wrapPage(null, Component)
      expect(Page.displayName).toBe('Page(CustomName)')
    })

    test('it defines display name with Component.name', () => {
      const Component = () => <div>Testing</div>
      const Page = wrapPage(null, Component)
      expect(Page.displayName).toBe('Page(Component)')
    })

    test('it defines .getInitialProps()', () => {
      const Page = wrapPage(null, () => null)
      expect(Page.getInitialProps).toBeTruthy()
    })

    test('it passes props to wrapped component', () => {
      const Component = () => <div>Testing</div>
      const Page = wrapPage(null, Component)
      const page = mount(<Page testing />)
      expect(page.find(Component)).toHaveProp('testing')
    })
  })

  describe('when loading props', () => {
    describe('and handler was provided', () => {
      test('it calls action within getInitialProps', () => {
        const route = { action: 'blog#index', handler: jest.fn() }
        const app = new Upcoming(route)
        const Page = wrapPage(app, () => null)
        const ctx = { query: { route } }
        Page.getInitialProps(ctx)
        expect(route.handler).toBeCalledWith(ctx)
      })
    })

    describe('and handler was not provided', () => {
      test('it returns empty object from getInitialProps', () => {
        const route = { action: 'blog#index' }
        const app = new Upcoming(route)
        const Page = wrapPage(app, () => null)
        const props = Page.getInitialProps({ query: { route } })
        expect(props).toEqual({})
      })
    })
  })

  describe('when renderering', () => {
    test('it renders Component', () => {
      const Page = wrapPage(null, () => <div>Testing</div>)
      expect(mount(<Page />)).toHaveText('Testing')
    })
  })
})
