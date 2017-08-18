import React from 'react'
import { shallow } from 'enzyme'
import { Form } from './'

describe('Form', () => {
  function mockAction () {
    const action = jest.fn()
    action.method = 'POST'
    action.path = '/cool'
    return action
  }

  describe('when initialising form', () => {
    test('the form has method and action props defined', () => {
      const form = shallow(<Form action={mockAction()} />)
      expect(form).toHaveProp('method', 'POST')
      expect(form).toHaveProp('action', '/cool')
    })

    test('the form can be provided default values', () => {
      const values = { user: { name: 'Luke' } }
      const form = shallow(<Form action={mockAction()} values={values} />)
      expect(form.instance().value('user[name]')).toEqual('Luke')
      expect(form.instance().values()).toEqual(values)
    })
  })

  describe('when form is submitted', () => {
    test('the route handler is called on submit', () => {
      const action = mockAction()
      const form = shallow(<Form action={action} />)
      form.simulate('submit', { preventDefault () {} })
      expect(action).toBeCalled()
    })

    test('the submit event is suppressed', () => {
      const form = shallow(<Form action={mockAction()} />)
      const preventDefault = jest.fn()
      form.simulate('submit', { preventDefault })
      expect(preventDefault).toBeCalled()
    })
  })

  describe('when receiving onChange event', () => {
    test('the form records values', () => {
      const form = shallow(<Form action={mockAction()} />)
      form.instance().handleChange('email', 'value')
      expect(form.instance().values()).toEqual({ email: 'value' })
    })

    test('the form records nested values', () => {
      const form = shallow(<Form action={mockAction()} />)
      form.instance().handleChange('user[name]', 'Luke')
      expect(form.instance().values()).toEqual({ user: { name: 'Luke' } })
    })
  })

  describe('when retrieving single value', () => {
    test('the form returns undefined if no value', () => {
      const form = shallow(<Form action={mockAction()} />)
      expect(form.instance().value('email')).toBeUndefined()
    })

    test('the form exposes value', () => {
      const form = shallow(<Form action={mockAction()} />)
      form.instance().handleChange('email', 'value')
      expect(form.instance().value('email')).toBe('value')
    })

    test('the form exposes nest value', () => {
      const form = shallow(<Form action={mockAction()} />)
      form.instance().handleChange('user[name]', 'Luke')
      expect(form.instance().value('user[name]')).toBe('Luke')
    })
  })

  describe('when form submitted', () => {
    test('the handler receives form values', () => {
      const action = mockAction()
      const form = shallow(<Form action={action} />)
      form.instance().handleChange('email', 'value')
      form.simulate('submit', { preventDefault () {} })
      expect(action).toBeCalledWith(form.instance().values())
    })
  })
})
