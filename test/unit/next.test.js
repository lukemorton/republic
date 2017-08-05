import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { wrapPage } from '../../src/next'

describe('Next', () => {
  describe('when wrapping component with next.js page', () => {
    test('it defines a getInitialProps', () => {
      const page = wrapPage(() => null)
      expect(page.getInitialProps).toBeTruthy()
    })

    test('it renders Component', () => {
      const WrappedComponent = wrapPage(null, () => <div>Testing</div>)
      const wrappedComponent = mount(<WrappedComponent />)
      expect(wrappedComponent.text()).toMatch('Testing')
    })
  })
})
