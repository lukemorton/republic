export default function href (action, params) {
  return {
    pathname: `/${action.replace('#', '/')}`,
    query: { ...params, action }
  }
}
