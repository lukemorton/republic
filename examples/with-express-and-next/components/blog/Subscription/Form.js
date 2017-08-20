import React from 'react'
import { Form, Input } from 'republic/react'

export default ({ subscribe }) =>
  <Form action={subscribe}>
    <p>
      <label htmlFor='email'>Subscribe your email address:</label>

      <Input type='text' name='subscription[email]' id='email' />
    </p>

    <p>
      <label htmlFor='spam'>Toggle spam</label>

      <Input type='checkbox' name='subscription[spam]' value='yes' id='spam' />
    </p>

    <p>
      <label htmlFor='spam'>Favourite colors</label>

      <label>
        <Input type='checkbox' name='subscription[color][]' value='blue' />
        blue
      </label>

      <label>
        <Input type='checkbox' name='subscription[color][]' value='red' />
        red
      </label>
    </p>

    <p>
      <label>
        <Input type='radio' name='subscription[cool]' value='yes' />
        i am cool
      </label>

      <label>
        <Input type='radio' name='subscription[cool]' value='no' />
        not cool
      </label>
    </p>

    <p>
      <button>Subscribe</button>
    </p>
  </Form>
