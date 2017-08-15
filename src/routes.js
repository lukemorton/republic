import compose from 'lodash.flowright'

function createRoute (method, path, action, callbacks = []) {
  const [module, name] = action.split('#')

  async function handler (ctx) {
    if (callbacks.length > 0) {
      const middleware = [...callbacks]
      const fn = middleware.pop()
      return await compose(...middleware)(fn)(ctx)
    }
  }

  handler.method = method
  handler.path = path

  return {
    method,
    path,
    action,
    module,
    name,
    isPage () {
      return false
    },
    handler
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
