import React from 'react'
import { mount } from 'enzyme'
import Upcoming from '../../src/upcoming'
import { Form, Input } from '../../src/react/'

describe('Application with forms', () => {
  describe('when form has input', () => {
    const handler = jest.fn()

    const app = new Upcoming({
      path: '/blog',
      action: 'blog#index',
      handler
    })

    const form = mount(
      <Form app={app} action='blog#index'>
        <p>
          <Input name="email" />
        </p>
      </Form>
    )

    test('the form is aware of changes to input', () => {
      form.find(Input).simulate('change', { target: { value: 'new@email.com' } })
      expect(form.instance().values()).toEqual({ email: 'new@email.com' })
    })

    test('the form injects values into inputs', () => {
      form.find(Input).simulate('change', { target: { value: 'new@email.com' } })
      expect(form.find('input').prop('value')).toBe('new@email.com')
    })

    test('the form passes values to action', () => {
      form.find(Input).simulate('change', { target: { value: 'new@email.com' } })
      form.simulate('submit', { preventDefault () {} })
      expect(handler).toBeCalledWith({ email: 'new@email.com' })
    })
  })
})
