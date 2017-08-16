import React from 'react'
import { Form, Input } from 'republic/react'

export default ({ subscribe }) =>
  <Form action={subscribe}>
    <p>
      <label htmlFor='email'>Subscribe your email address:</label>

      <Input type='text' name='subscription.email' id='email' />
    </p>

    <p>
      <button>Subscribe</button>
    </p>
  </Form>
