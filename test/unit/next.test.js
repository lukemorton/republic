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
      test('it calls action within getInitialProps', async () => {
        const req = { mock: true }
        const query = { action: 'blog#index' }
        const route = { action: 'blog#index', handler: jest.fn() }
        const app = new Upcoming(route)
        const Page = wrapPage(app, () => null)
        await Page.getInitialProps({ req, query })
        expect(route.handler).toBeCalledWith(
          expect.objectContaining({ req, route, query })
        )
      })

      test('it returns empty object if handler returns undefined', async () => {
        const route = { action: 'blog#index', handler: jest.fn(() => undefined) }
        const app = new Upcoming(route)
        const Page = wrapPage(app, () => null)
        const props = await Page.getInitialProps({ query: { route } })
        expect(props).toEqual({})
      })
    })

    describe('and handler was not provided', () => {
      test('it returns empty object from getInitialProps', async () => {
        const route = { action: 'blog#index' }
        const app = new Upcoming(route)
        const Page = wrapPage(app, () => null)
        const props = await Page.getInitialProps({ query: { route } })
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
