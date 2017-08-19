import Router from 'next/router'
import href from './href'

export default function createRedirectTo (app, res) {
  return function redirectTo (action, params) {
    const path = app.url(action, params)

    if (res) {
      res.redirect(path)
    } else {
      Router.push(href(action), path)
    }
  }
}
