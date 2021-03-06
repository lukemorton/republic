import React from 'react'
import { mount } from 'enzyme'
import Republic from '../../lib/republic'
import { Form, Input, Select } from '../../lib/react/'

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

          <p>
            <Select name='user[country]'>
              <option value='UK'>UK</option>
              <option value='Japan'>Japan</option>
            </Select>
          </p>

          <p>
            <Select name='user[food]' multiple>
              <option value='Menemen'>Menemen</option>
              <option value='Full English'>Full English</option>
            </Select>
          </p>
        </Form>
      )
    }

    test('the form is aware of changes to input', () => {
      const form = createForm()

      const inputs = form.find('input')
      inputs.find({ name: 'user[email]' }).simulate('change', { target: { value: 'new@email.com' } })
      inputs.find({ name: 'user[remember]' }).simulate('change', { target: { value: 'yes', checked: true } })
      inputs.find({ name: 'user[colors][]', value: 'blue' }).simulate('change', { target: { value: 'blue', checked: true } })
      inputs.find({ name: 'user[cool]', value: 'yes' }).simulate('change', { target: { value: 'yes', checked: true } })

      const selects = form.find('select')
      selects.find({ name: 'user[country]' }).simulate('change', { target: { value: 'UK' } })
      selects.find({ name: 'user[food]' }).simulate('change', { target: { selectedOptions: [{ value: 'Menemen'}] } })

      expect(form.instance().values()).toEqual({
        user: {
          email: 'new@email.com',
          remember: 'yes',
          colors: ['blue'],
          cool: 'yes',
          country: 'UK',
          food: ['Menemen']
        }
      })

      inputs.find({ name: 'user[colors][]', value: 'blue' }).simulate('change', { target: { value: 'blue', checked: false } })
      inputs.find({ name: 'user[cool]', value: 'no' }).simulate('change', { target: { value: 'no', checked: true } })
      selects.find({ name: 'user[country]' }).simulate('change', { target: { value: 'Japan' } })
      selects.find({ name: 'user[food]' }).simulate('change', { target: { selectedOptions: [{ value: 'Menemen'}, { value: 'Full English' }] } })

      expect(form.instance().values()).toEqual({
        user: {
          email: 'new@email.com',
          remember: 'yes',
          colors: [],
          cool: 'no',
          country: 'Japan',
          food: ['Menemen', 'Full English']
        }
      })
    })

    test('the form injects values into inputs', () => {
      const form = createForm()
      const input = () => form.find('input').filter({ name: 'user[email]' })
      input().simulate('change', { target: { value: 'new@email.com' } })
      expect(input().prop('value')).toBe('new@email.com')
    })

    test('the form passes values to action', () => {
      const action = jest.fn()
      const form = createForm(action)
      form.find('input').find({ name: 'user[email]' }).simulate('change', { target: { value: 'new@email.com' } })
      form.simulate('submit', { preventDefault () {} })
      expect(action).toBeCalledWith({ user: { email: 'new@email.com' } })
    })
  })
})
