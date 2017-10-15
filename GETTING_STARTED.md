# Getting started with Express + Next.js + Republic

This is a guide for learning how Express + Next.js + Republic can be wired up to provide you with a productive and modern web application.

**If at any point you get stuck, please just [open an issue](https://github.com/lukemorton/republic/issues) on GitHub.**

## Create your project

You can generate a new project Next.js with one command. Make sure you have the latest version of [NPM installed](https://docs.npmjs.com/getting-started/installing-node#updating-npm) as npx was introduced in `v5.2`.

```
npm i -g npm
npx create-next-app my-new-app
cd my-new-app
```

This will generate a new directory called `my-new-app/` with a Next.js application setup within it.

## Installing Republic and other dependencies

This step is fairly easy.

```
npm install --save republic babel-register express body-parser
```

We install Republic for obvious reasons (it's great and this is a getting started guide for Republic). We also install Babel CLI so we can have modern JavaScript syntax. Lastly we install Express.

## Defining your application

Republic has the idea of an application object. This object represents the routes of your application amongst other things. The routes describe what URLs match with your Next.js pages.

Create an `lib/app.js` with the following:

``` js
import Republic, { route } from 'republic/next'

export default new Republic(
  route.page('/', 'blog#index')
)
```

The route defined above tells Republic that the `/` URL should be routed to the page contained within `pages/blog/index.js`.

It's worth noting that `lib/app.js` file will be run in both the node.js server environment and on the client side (in the web browser). Any imported libraries must work in both environments.

## Creating our page

Okay now lets setup our page. This isn't quite the same as in Next.js, as to get the magic of Republic we need to give our page super powers.

Create `pages/blog/index.js` with the following:

``` js
import React from 'react'
import app from '../../lib/app'

export default app.page(() =>
  <div>
    <h1>Hello world</h1>
  </div>
)
```

The super powers come from the `app.page()`.

Before we go any further, boot up the application to see if everything is working as expected.

```
node_modules/.bin/republic --env dev --require babel-register lib/app.js
```

It may take a few seconds to boot up.
