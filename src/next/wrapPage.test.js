import React from 'react'
import { mount } from 'enzyme'
import { wrapPage } from './'
import Upcoming from '../upcoming'

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

  describe('when providing props to component', () => {
    const req = { mock: true }
    const query = { action: 'blog#index' }
    const route = { action: 'blog#index', module: 'blog', handler: jest.fn() }
    const app = new Upcoming(route)
    const Page = wrapPage(app, () => null)

    test('it calls action within getInitialProps', async () => {
      await Page.getInitialProps({ req, query })
      expect(route.handler).toBeCalledWith(
        expect.objectContaining({ req, route, query })
      )
    })

    test('it provides handlers results as props', async () => {
      route.handler.mockReturnValueOnce({ nice: true })
      const props = await Page.getInitialProps({ query })
      expect(props).toMatchObject({ nice: true })
    })

    test('it provides actions as props', async () => {
      const props = await Page.getInitialProps({ query })
      expect(props).toMatchObject({
        actions: { blog: { index: route.handler } }
      })
    })

    test('it provides local actions as props', async () => {
      const props = await Page.getInitialProps({ query: { action: 'blog#index' } })
      expect(props).toMatchObject({ index: route.handler })
    })

    test('it raises exception when no route found', async () => {
      expect(Page.getInitialProps({ query: { action: 'blog#show' } })).rejects.toBeDefined()
    })
  })

  describe('when renderering', () => {
    test('it renders Component', () => {
      const Page = wrapPage(null, () => <div>Testing</div>)
      expect(mount(<Page />)).toHaveText('Testing')
    })
  })
})
