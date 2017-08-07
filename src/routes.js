import compose from 'lodash.compose'

function createRoute (method, path, action, callbacks = []) {
  const [module, name] = action.split('#')

  return {
    method,
    path,
    action,
    module,
    name,
    isPage () {
      return false
    },
    async handler (ctx) {
      if (callbacks.length > 0) {
        const middleware = [...callbacks]
        const fn = middleware.pop()
        return await compose(...middleware)(fn)(ctx)
      }
    }
  }
}

export function page (path, action, callbacks) {
  return {
    ...createRoute('GET', path, action, callbacks),
    isPage () {
      return true
    }
  }
}

export function GET (path, action, callbacks) {
  return createRoute('GET', path, action, callbacks)
}

export function POST (path, action, callbacks) {
  return createRoute('POST', path, action, callbacks)
}

export function DELETE (path, action, callbacks) {
  return createRoute('DELETE', path, action, callbacks)
}
