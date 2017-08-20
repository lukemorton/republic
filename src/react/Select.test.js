import React from 'react'
import { shallow } from 'enzyme'
import { Select } from './'

describe('Select', () => {
  function createSelect (props = {}, context = {}) {
    return shallow(
      <Select name='cool' {...props}>
        <option value='yes'>Yes</option>
        <option value='no'>No</option>
      </Select>,
      { context }
    )
  }

  function createSelectWithValue (value, context = {}) {
    return createSelect({ value }, context)
  }

  function createSelectWithContext (context) {
    return createSelectWithValue(undefined, context)
  }

  describe('when rendered', () => {
    test('it delegates props to <select>', () => {
      const select = createSelect({ name: 'country' })
      expect(select.find('select')).toHaveProp('name', 'country')
    })

    test('it throws error if no name provided', () => {
      expect(() => createSelect({ name: undefined })).toThrow()
    })

    test('it sets a onChange handler by default', () => {
      const select = createSelect()
      expect(select.find('select')).toHaveProp('onChange')
    })

    test('it sets value to undefined (uncontrolled input) by default', () => {
      const select = createSelect()
      expect(select.find('select')).toHaveProp('value', undefined)
    })
  })

  test('it can get value from context', () => {
    const value = jest.fn(() => 'yes')
    const select = createSelectWithContext({ value })
    expect(select).toHaveProp('value', 'yes')
  })

  describe('when provided custom onChange handler via props', () => {
    test('it passes event as is', () => {
      const onChange = jest.fn()
      const select = createSelect({ onChange })
      const event = { target: { value: 'no' } }
      select.simulate('change', event)
      expect(onChange).toBeCalledWith(event)
    })
  })

  describe('when provided custom onChange handler via context', () => {
    test('it passes name and value', () => {
      const onChange = jest.fn()
      const select = createSelect({ name: 'country' }, { onChange })
      const event = { target: { value: 'UK' } }
      select.simulate('change', event)
      expect(onChange).toBeCalledWith('country', 'UK', { multi: undefined })
    })

    test('it passes multi if provided', () => {
      const onChange = jest.fn()
      const select = createSelect({ name: 'country', multi: true }, { onChange })
      const event = { target: { value: 'UK' } }
      select.simulate('change', event)
      expect(onChange).toBeCalledWith('country', 'UK', { multi: true })
    })
  })
})
