# Republic

![Plato](https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg)  
[![npm version](https://badge.fury.io/js/republic.svg)](https://badge.fury.io/js/republic)

Republic is a library for React that gives you universal routing, controllers, and forms. It currently is built to work with Express + Next.js but has been built in mind that this may not always be the stack of choice.

If you miss the days of Rails forms and controllers, you'll love Republic.

- **[Beginners Guide](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)** - for those who haven't used Republic before
- **[Quick Start](#quick-install)** - for those in a rush
- **[Documentation](#documentation)** - for a reference of all the parts to Republic
  - [Installation](#installation)

## Beginners Guide

We have a lovely document for creating an application from scratch using Express + Next.js + Republic. The guide is a complete walkthrough that's ideal for first time users. [Read it to get started.](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)

## Concepts

### Universal routing

Republic provides routing functionality like Rails. You can build a URL or `<a href>` just by referencing the controller and action, perhaps providing some parameters.

#### Defining routes

You define your routes in your Republic application. Your Republic application is universal, that is, it can be used both on the server and on the client side.

``` js
export default new Republic(
  route.page('/blog', 'blog#index'),
  route.page('/blog/:slug', 'blog#show')
)
```

You can use express style routing, so for example parameters can be passed specified like `:slug`.

#### Building URLs

You can construct URLs given an action like `'blog#index'`, and optionally params like `{ slug: 'awesome-post' }`.

``` js
app.url('blog#index') // => '/blog'
app.url('blog#show', { slug: 'awesome-post' }) // => '/blog/awesome-post'
```

Because your Republic application is universal, you can build URLs both on the server and a client.

#### Building `<a href>`
  
``` jsx
<Link action='blog#index'>
  <a>View posts</a>
</Link>
```

``` jsx
<Link action='blog#show' params={{ slug: 'awesome-post' }}>
  <a>Read awesome post</a>
</Link>
```

### Universal controllers

If you are familiar with Republic or you're just feeling brave you can use this quick start instead of the [getting started guide](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md). It's particularly ideal if you need a check list for adding Republic to your new application.



### Defining your routes

Create an `app.js` file in the root of your application, or any where else, just remember to adjust the path when copying examples.

``` js
import Republic, { route } from 'republic/next'

export default new Republic(
  route.page('/blog', 'blog#index')
)
```

### Defining your pages

Create a Next.js page in a directory that matches the action. For example with an action of 'blog#index' you should place your page in `pages/blog/index.js`.

You need to make sure you wrap your page with `app.page()`.

``` js
import React from 'react'
import app from '../../app'

export default app.page(() =>
  <div>
    <h1>Hello world</h1>
  </div>
)
```

That's your page setup.



Now you should be able to run the app and visit `/blog` or whatever your URL was.

## Documentation

### Installation

#### Install Express + Next.js

Use Next.js's [example of custom server using Express](https://github.com/zeit/next.js/tree/master/examples/custom-server-express) to setup your app ready to install Republic.

#### Install Republic

Install republic first with:

```
npm install --save republic
```

Now add two middleware to your Express setup. The following code adds parsing for POST data.

``` js
// Handle POST data
import bodyParser from 'body-parser'
server.use(bodyParser.urlencoded({ extended: true }))
```

And then we add republic into the mix:

``` js
// Hook up upcoming + express + next
import { asExpressMiddleware, nextHandler } from 'republic/express'
import app from './app'
server.use(asExpressMiddleware(app, nextHandler(nextApp)))
```

Make sure the path to your app file is correct.

### new Republic

### wrapPage

### &lt;Link&gt;

### &lt;Form&gt;

### &lt;Input&gt;

## Roadmap

- [x] Form state handling
- [x] Connect form state to action handling
- [x] Form handling receives nested object rather than flattened string keys
- [x] Allow forms to have default state set
- [x] Pass actions in as functions rather than strings so they can be used with custom forms, and on other input events like click

**Nice to haves:**

- [x] Update route builders to accept middleware as arguments, array as single argument, or mix of both like Express
- [x] Pass rails-like params into handlers
- [ ] Convention for express + next (helper wrappers)
- [ ] Form error handling
- [ ] Universal redirect
- [ ] Abstract pages away from Next.js
- [ ] Allow Form to have custom onSubmit
- [ ] Provide all common form inputs
- [ ] Upcoming middleware: how to, make sure API is easy to understand, etc.
