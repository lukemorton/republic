import React from 'react'
import { shallow } from 'enzyme'
import { Input } from './'

describe('Input', () => {
  describe('when rendered', () => {
    test('it delegates props to <input />', () => {
      const input = shallow(<Input type='checkbox' name='testing' />)
      expect(input.find('input')).toHaveProp('type', 'checkbox')
      expect(input.find('input')).toHaveProp('name', 'testing')
    })

    test('it throws error if no name provided', () => {
      expect(() => shallow(<Input />)).toThrow()
    })

    test('it sets a onChange handler by default', () => {
      const input = shallow(<Input name='testing' />)
      expect(input.find('input')).toHaveProp('onChange')
    })

    test('it sets value to undefined (uncontrolled input) by default', () => {
      const input = shallow(<Input name='testing' />)
      expect(input.find('input')).toHaveProp('value', undefined)
    })
  })

  describe('when provided custom onChange handler via props', () => {
    test('it passes event as is', () => {
      const onChange = jest.fn()
      const input = shallow(<Input name='email' onChange={onChange} />)
      const event = { target: { value: 'new@example.com' } }
      input.simulate('change', event)
      expect(onChange).toBeCalledWith(event)
    })
  })

  describe('when provided custom onChange handler via context', () => {
    test('it passes name and value only', () => {
      const onChange = jest.fn()
      const input = shallow(<Input name='email' />, { context: { onChange } })
      const event = { target: { value: 'new@example.com' } }
      input.simulate('change', event)
      expect(onChange).toBeCalledWith('email', 'new@example.com')
    })
  })

  describe('when provided value via props', () => {
    test('it sets value', () => {
      const input = shallow(<Input name='testing' value='cool' />)
      expect(input.find('input')).toHaveProp('value', 'cool')
    })
  })

  describe('when provided value() via context', () => {
    test('it sets value provided by fn', () => {
      const value = () => 'bob'
      const input = shallow(<Input name='testing' />, { context: { value } })
      expect(input.find('input')).toHaveProp('value', 'bob')
    })

    test('it sets value to empty string if fn returns undefined', () => {
      const value = () => undefined
      const input = shallow(<Input name='testing' />, { context: { value } })
      expect(input.find('input')).toHaveProp('value', '')
    })
  })
})
