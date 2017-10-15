import Options from './options'

describe('new Options', () => {
  let options

  beforeEach(() => options = new Options({ _: ['lib/app'] }))

  it('should return appPath', () => {
    expect(options.appPath()).toContain('lib/app')
  })

  it('should return port', () => {
    expect(options.port()).toBe(3000)
  })

  it('should return env', () => {
    expect(options.env()).toBe('test')
  })

  it('should return dev', () => {
    expect(options.dev()).toBe(true)
  })

  it('should return requireFiles', () => {
    expect(options.requireFiles()).toBeInstanceOf(Array)
  })
})
