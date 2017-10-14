import React from 'react'
import { mount } from 'enzyme'

export async function pageProps (Page, action, params = {}) {
  return Page.getInitialProps({ query: { action, ...params } })
}

export async function mountPage (Page, action, params = {}) {
  const props = await pageProps(Page, action, params)
  return mount(<Page {...props} />)
}
