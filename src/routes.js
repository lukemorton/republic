function createAction (method, path, action, callbacks) {
  console.log('Serving', method, path, 'with', action)
  const [module, name] = action.split('#')

  return {
    method,
    path,
    action,
    module,
    name,
    handler () {
      if (callbacks && callbacks[0]) {
        return callbacks[0]()
      }
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
