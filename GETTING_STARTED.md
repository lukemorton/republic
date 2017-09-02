# Getting started with Express + Next.js + Republic

This is a guide for learning how Express + Next.js + Republic can be wired up to provide you with a productive and modern web application.

**If at any point you get stuck, please just [open an issue](https://github.com/lukemorton/republic/issues) on GitHub.**

## Create your project

You can generate a new project Next.js with one command. Make sure you have the latest version of [NPM installed](https://docs.npmjs.com/getting-started/installing-node#updating-npm).

```
npx create-next-app my-new-app
cd my-new-app
```

This will generate a new directory called `my-new-app/` with a Next.js application setup within it.

## Installing Republic and other dependencies

This step is fairly easy.

```
npm install --save republic babel-cli express
```

We install Republic for obvious reasons (it's great and this is a getting started guide for Republic). We also install Babel CLI so we can have modern JavaScript syntax. Lastly we install Express.

## Defining your application

Republic has the idea of an application object. This object represents the routes of your application amongst other things. The routes describe what URLs match with your Next.js pages.

Create an `app.js` file in your applications root directory with the following:

``` js
import Republic, { route } from 'republic/next'

export default new Republic(
  route.page('/', 'blog#index')
)
```

The route defined above tells Republic that the `/` URL should be routed to the page contained within `pages/blog/index.js`.

It's worth noting that `app.js` file will be run in both the node.js server environment and on the client side (in the web browser). Any imported libraries must work in both environments.

## Hooking up Republic with Express + Next.js

Next.js by default provides it's own server. In the setup below, we switch this our for Express probably the most popular Node.js HTTP server out there.

Create a `server.js` file in the root directory of your application with the code below. This will wire up Express + Next.js + Republic.

``` js
import express from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import { asExpressMiddleware, nextHandler } from 'republic/express'
import app from './app'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dir: __dirname, dev })

nextApp.prepare().then(() => {
  const server = express()

  // Handle POST data
  server.use(bodyParser.urlencoded({ extended: true }))

  // Hook up upcoming + express + next
  server.use(asExpressMiddleware(app, nextHandler(nextApp)))

  // Handle 404s and other non-upcoming pages
  server.get('*', (req, res) => nextApp.getRequestHandler()(req, res))

  server.listen(3000)
})
```

The code above creates the next app, initialises an express server, and then wires up Next.js to Express + Republic. Let's go over each section.

``` js
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dir: __dirname, dev })
```

Here we configure Next.js to look for files in the same directory as your `server.js`, and when not in a production environment enable Next.js hot reloading features.

We then prepare the Next.js application:

``` js
nextApp.prepare().then(() => {
  // ...
})
```

This line builds the necessary files for Next.js into the `.next/` directory.

Inside the promise callback (the `.then(() => {})` bit) we initialise the Express server.

``` js
const server = express()
```

This line gives us a new instance of Express.

We then need to start configuring our middleware for the Express server.

``` js
server.use(bodyParser.urlencoded({ extended: true }))
```

We then setup the bodyParse middleware for decoding POST data. This is required by Republic in order to provide universal actions (controllers in Rails-speak).

Next up we need to connect the dots.

``` js
server.use(asExpressMiddleware(app, nextHandler(nextApp)))
```

We then wrap our Republic application up as express middleware, also specifying a Next.js handler. This is all the glue for connecting Express + Next.js + Republic.

We then need to make sure we connect all other requests to Next.js. We do this with a catch all `*`.

``` js
server.get('*', (req, res) => nextApp.getRequestHandler()(req, res))
```

Express will now pass all other requests that are not handled by Republic to Next.js. This means error handling, including 404s, are handled by Next.js.

Finally we start the server.

``` js
server.listen(3000)
```

## Creating our page

Okay now lets setup our page. This isn't quite the same as in Next.js, as to get the magic of Republic we need to give our page super powers.

``` js
import React from 'react'
import app from '../../app'

export default app.page(() =>
  <div>
    <h1>Hello world</h1>
  </div>
)
```

The super powers come from the `app.page()`.

Before we go any further, boot up the application to see if everything is working as expected.

```
node_modules/.bin/babel-node server.js
```

It may take a few seconds to boot up.
