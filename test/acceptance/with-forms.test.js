import React from 'react'
import { mount } from 'enzyme'
import Republic from '../../src/republic'
import { Form, Input } from '../../src/react/'

describe('Application with forms', () => {
  describe('when form has input', () => {
    function createForm (action) {
      action = action || (() => null)
      action.method = 'POST'
      action.path = '/blog'

      return mount(
        <Form action={action}>
          <p>
            <Input name='user[email]' />
          </p>
          <p>
            <Input type='checkbox' name='user[remember]' value='yes' />
          </p>
          <p>
            <Input type='checkbox' name='user[colors][]' value='blue' />
            <Input type='checkbox' name='user[colors][]' value='red' />
          </p>
          <p>
            <Input type='radio' name='user[cool]' value='yes' />
            <Input type='radio' name='user[cool]' value='no' />
          </p>
        </Form>
      )
    }

    test('the form is aware of changes to input', () => {
      const form = createForm()
      form.find({ name: 'user[email]' }).simulate('change', { target: { value: 'new@email.com' } })
      form.find({ name: 'user[remember]' }).simulate('change', { target: { value: 'yes', checked: true } })
      form.find({ name: 'user[colors][]', value: 'blue' }).simulate('change', { target: { value: 'blue', checked: true } })
      form.find({ name: 'user[cool]', value: 'yes' }).simulate('change', { target: { value: 'yes', checked: true } })

      expect(form.instance().values()).toEqual({
        user: {
          email: 'new@email.com',
          remember: 'yes',
          colors: ['blue'],
          cool: 'yes',
        }
      })

      form.find({ name: 'user[colors][]', value: 'blue' }).simulate('change', { target: { value: 'blue', checked: false } })
      form.find({ name: 'user[cool]', value: 'no' }).simulate('change', { target: { value: 'no', checked: true } })

      expect(form.instance().values()).toEqual({
        user: {
          email: 'new@email.com',
          remember: 'yes',
          colors: [],
          cool: 'no'
        }
      })
    })

    test('the form injects values into inputs', () => {
      const form = createForm()
      const input = form.find({ name: 'user[email]' })
      input.simulate('change', { target: { value: 'new@email.com' } })
      expect(input.find('input').prop('value')).toBe('new@email.com')
    })

    test('the form passes values to action', () => {
      const action = jest.fn()
      const form = createForm(action)
      form.find({ name: 'user[email]' }).simulate('change', { target: { value: 'new@email.com' } })
      form.simulate('submit', { preventDefault () {} })
      expect(action).toBeCalledWith({ user: { email: 'new@email.com' } })
    })
  })
})
