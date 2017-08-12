import React from 'react'
import { shallow } from 'enzyme'
import { Form } from '../../src/react'

describe('Form', () => {
  describe('when javascript is not present', () => {
    test('the form has method and action props defined', () => {
      const app = { route: jest.fn(() => ({ method: 'POST', path: '/cool' })) }
      const form = shallow(<Form app={app} />)
      expect(form).toHaveProp('method', 'POST')
      expect(form).toHaveProp('action', '/cool')
    })
  })

  describe('when javascript is available', () => {
    test('the route handler is called on submit', () => {
      const handler = jest.fn()
      const app = { route: () => ({ handler }) }
      const form = shallow(<Form app={app} />)
      form.simulate('submit', { preventDefault () {} })
      expect(handler).toBeCalled()
    })

    test('the submit event is suppressed', () => {
      const app = { route: () => ({ handler () {} }) }
      const form = shallow(<Form app={app} />)
      const preventDefault = jest.fn()
      form.simulate('submit', { preventDefault })
      expect(preventDefault).toBeCalled()
    })
  })

  describe('when Form provided app via context', () => {
    test('the form has method and action props defined', () => {
      const app = { route: jest.fn(() => ({ method: 'POST', path: '/cool' })) }
      const form = shallow(<Form />, { context: { app } })
      expect(form).toHaveProp('method', 'POST')
      expect(form).toHaveProp('action', '/cool')
    })
  })
})
