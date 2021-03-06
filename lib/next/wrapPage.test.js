import React from 'react'
import { mount, shallow } from 'enzyme'
import { wrapPage } from './'
import Republic from '../republic'

describe('wrapPage()', () => {
  describe('when wrapping component with next.js page', () => {
    test('it defines display name with Component.displayName', () => {
      const Component = () => <div>Testing</div>
      Component.displayName = 'CustomName'
      const Page = wrapPage(new Republic, Component)
      expect(Page.displayName).toBe('Page(CustomName)')
    })

    test('it defines display name with Component.name', () => {
      const Component = () => <div>Testing</div>
      const Page = wrapPage(new Republic, Component)
      expect(Page.displayName).toBe('Page(Component)')
    })

    test('it defines .getInitialProps()', () => {
      const Page = wrapPage(new Republic, () => null)
      expect(Page.getInitialProps).toBeTruthy()
    })

    test('it passes props to wrapped component', () => {
      const Component = () => <div>Testing</div>
      const route = { action: 'blog#index', module: 'blog', handler: jest.fn() }
      const Page = wrapPage(new Republic(route), Component)
      const page = mount(<Page action='blog#index' testing />)
      expect(page.find(Component)).toHaveProp('testing')
    })
  })

  describe('when providing props to component', () => {
    const req = { mock: true }
    const params = { id: '1' }
    const query = { action: 'blog#index', ...params }
    const route = { action: 'blog#index', module: 'blog', handler: jest.fn() }
    const app = new Republic(route)
    const Page = wrapPage(app, () => null)

    test('it calls handler within getInitialProps', async () => {
      await Page.getInitialProps({ req, query })
      expect(route.handler).toBeCalledWith(
        params,
        expect.objectContaining({ req, route, query })
      )
    })

    describe('and handler returns values', () => {
      beforeEach(() => {
        route.handler.mockReturnValueOnce({ nice: true })
      })

      test('it provides handlers results in props', async () => {
        const props = await Page.getInitialProps({ query })
        expect(props).toMatchObject({ nice: true })
      })

      test('it provides params in props', async () => {
        const props = await Page.getInitialProps({ query })
        expect(props).toMatchObject({ params })
      })
    })

    describe('and handler returns null', () => {
      beforeEach(() => {
        route.handler.mockReturnValueOnce(null)
      })

      test('it provides params in props', async () => {
        const props = await Page.getInitialProps({ query })
        expect(props).toMatchObject({ params })
      })
    })

    test('it provides params in props', async () => {
      const props = await Page.getInitialProps({ query })
      expect(props).toMatchObject({ params })
    })

    test('it provides actions as props', async () => {
      const page = shallow(<Page action={route.action} />)
      expect(page.props()).toMatchObject({
        actions: { blog: { index: route.handler } }
      })
    })

    test('it provides local actions as props', async () => {
      const page = shallow(<Page action={route.action} />)
      expect(page.props()).toMatchObject({ index: route.handler })
    })

    test('it raises exception when no route found', async () => {
      expect(Page.getInitialProps({ query: { action: 'blog#show' } })).rejects.toBeDefined()
    })
  })

  describe('when renderering', () => {
    test('it renders Component', () => {
      const route = { action: 'blog#index', module: 'blog', handler: jest.fn() }
      const Page = wrapPage(new Republic(route), () => <div>Testing</div>)
      expect(mount(<Page action='blog#index' />)).toHaveText('Testing')
    })
  })
})
