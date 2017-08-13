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
})
