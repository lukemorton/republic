import Republic from './'

describe('Republic (Next)', () => {
  describe('when initialised', () => {
    test('it provides .page()', () => {
      const app = new Republic
      expect(app.page).toBeDefined()
    })

    test('it provides .buildLink()', () => {
      const app = new Republic
      expect(app.buildLink).toBeDefined()
    })
  })

  describe('when building page', () => {
    test('it does not error', () => {
      const app = new Republic
      expect(() => app.page(() => 'Yay')).not.toThrow()
    })
  })

  describe('when fetching routes', () => {
    test('it injects redirectTo', () => {
      const handler = jest.fn()
      const app = new Republic({ handler })
      const [route] = app.routes()
      route.handler({})
      expect(handler).toBeCalledWith(
        {},
        expect.objectContaining({ redirectTo: expect.any(Function) })
      )
    })
  })
})
