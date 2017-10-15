#! /usr/bin/env node

import { createNextServer } from '../express'
import Options from './options'

const options = new Options

options.requireFiles().map(file => require(file))

console.log(`Loading app from ${options.appPath()}`)
const app = require(options.appPath()).default

console.log(`DEV=${options.dev()}`)

createNextServer({ app, dev: options.dev() }).then((server) => {
  console.log(`Listening on port ${options.port()}`)
  server.listen(options.port())
})
