import minimist from 'minimist'
import path from 'path'

export default class Options {
  constructor (argv) {
    this.argv = argv || minimist(process.argv.slice(2))
  }

  appPath () {
    return path.join(process.cwd(), this.argv._[0])
  }

  port () {
    return process.env.PORT || this.argv.port || 3000
  }

  env () {
    return process.env.NODE_ENV || this.argv.env || 'production'
  }

  dev () {
    return this.env() !== 'production'
  }

  requireFiles () {
    if (this.argv.require == null) {
      return []
    }

    return Array.isArray(this.argv.require) ? this.argv.require : [this.argv.require]
  }
}
