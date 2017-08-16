import React from 'react'
import { mount } from 'enzyme'
import Republic from '../../src/republic'
import { Form, Input } from '../../src/react/'

describe('Application with forms', () => {
  describe('when form has input', () => {
    const action = jest.fn()
    action.method = 'POST'
    action.path = '/blog'

    const form = mount(
      <Form action={action}>
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
      expect(action).toBeCalledWith({ email: 'new@email.com' })
    })
  })
})
