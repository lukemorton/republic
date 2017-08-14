import React from 'react'
import { shallow } from 'enzyme'
import { Form } from './'

describe('Form', () => {
  describe('when initialising form', () => {
    test('the form has method and action props defined', () => {
      const app = { route: jest.fn(() => ({ method: 'POST', path: '/cool' })) }
      const form = shallow(<Form app={app} />)
      expect(form).toHaveProp('method', 'POST')
      expect(form).toHaveProp('action', '/cool')
    })

    test('the form can be provided default values', () => {
      const app = { route: () => ({ handler () {} }) }
      const values = { user: { name: 'Luke' } }
      const form = shallow(<Form app={app} values={values} />)
      expect(form.instance().value('user.name')).toEqual('Luke')
      expect(form.instance().values()).toEqual(values)
    })
  })

  describe('when form is submitted', () => {
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

  describe('when receiving onChange event', () => {
    test('the form records values', () => {
      const app = { route: () => ({ handler () {} }) }
      const form = shallow(<Form app={app} />)
      form.instance().handleChange('email', 'value')
      expect(form.instance().values()).toEqual({ email: 'value' })
    })

    test('the form records nested values', () => {
      const app = { route: () => ({ handler () {} }) }
      const form = shallow(<Form app={app} />)
      form.instance().handleChange('user.name', 'Luke')
      expect(form.instance().values()).toEqual({ user: { name: 'Luke' } })
    })
  })

  describe('when retrieving single value', () => {
    test('the form returns undefined if no value', () => {
      const app = { route: () => ({ handler () {} }) }
      const form = shallow(<Form app={app} />)
      expect(form.instance().value('email')).toBeUndefined()
    })

    test('the form exposes value', () => {
      const app = { route: () => ({ handler () {} }) }
      const form = shallow(<Form app={app} />)
      form.instance().handleChange('email', 'value')
      expect(form.instance().value('email')).toBe('value')
    })

    test('the form exposes nest value', () => {
      const app = { route: () => ({ handler () {} }) }
      const form = shallow(<Form app={app} />)
      form.instance().handleChange('user.name', 'Luke')
      expect(form.instance().value('user.name')).toBe('Luke')
    })
  })

  describe('when form submitted', () => {
    test('the handler receives form values', () => {
      const handler = jest.fn()
      const app = { route: () => ({ handler }) }
      const form = shallow(<Form app={app} />)
      form.instance().handleChange('email', 'value')
      form.simulate('submit', { preventDefault () {} })
      expect(handler).toBeCalledWith(form.instance().values())
    })
  })
})
