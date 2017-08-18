import next from 'next'
import { createServer } from './server'

process.on('unhandledRejection', (e) => console.error(e))

const nextApp = next({ dir: __dirname, dev: true })

nextApp.prepare().then(() => {
  createServer(nextApp).listen(3000)
})
