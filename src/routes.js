function createAction (method, path, action, callbacks = []) {
  console.log('Serving', method, path, 'with', action)
  const [module, name] = action.split('#')

  return {
    method,
    path,
    action,
    module,
    name,
    async handler () {
      let result = {}

      if (callbacks.length > 0) {
        for (let cb of callbacks) {
          result = { ...result, ...await cb() }
        }
      }

      return result
    }
  }
}

export function page (path, action, callbacks) {
  return createAction('GET', path, action, callbacks)
}

export function GET (path, action, callbacks) {
  return createAction('GET', path, action, callbacks)
}

export function POST (path, action, callbacks) {
  return createAction('POST', path, action, callbacks)
}

export function DELETE (path, action, callbacks) {
  return createAction('DELETE', path, action, callbacks)
}
