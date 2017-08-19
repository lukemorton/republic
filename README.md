# Republic

![Plato](https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg)  
[![npm version](https://badge.fury.io/js/republic.svg)](https://badge.fury.io/js/republic)

Republic is a library for React that gives you universal routing, controllers, and forms. It currently is built to work with Express + Next.js but has been built in mind that this may not always be the stack of choice.

If you miss the days of Rails forms and controllers, you'll love Republic.

- **[Beginners Guide](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)** - for those who haven't used Republic before
- **[Concepts](#concepts)** - the reasons why you should use Republic
- **[Documentation](#documentation)** - for a reference of all the parts to Republic

## Beginners Guide

We have a lovely document for creating an application from scratch using Express + Next.js + Republic. The guide is a complete walkthrough that's ideal for first time users. [Read it to get started.](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)

## Concepts

### Universal Routing

Republic provides routing functionality like Rails. You can build a URL or `<a href>` just by referencing the controller and action, perhaps providing some parameters.

#### Defining Routes

You define your routes in your Republic application. Your Republic application is universal, that is, it can be used both on the server and on the client side.

``` js
import Republic, { route } from 'republic/next'

export default new Republic(
  route.page('/blog', 'blog#index'),
  route.page('/blog/:slug', 'blog#show')
)
```

You can use express style routing, so for example parameters can be passed specified like `:slug`.

#### Building URLs

You can construct URLs given an action like `'blog#index'`, and optionally params like `{ slug: 'awesome-post' }`.

``` js
import app from '../../app'

app.url('blog#index') // => '/blog'
app.url('blog#show', { slug: 'awesome-post' }) // => '/blog/awesome-post'
```

Because your Republic application is universal, you can build URLs both on the server and a client.

#### Building `<a href>`

You can build links much like Next.js, but you do not need to hardcode URLs, instead you can specify an action and optionally params.
  
``` jsx
import React from 'react'
import { Link } from 'republic/react'

export default () =>
  <div>
    <Link action='blog#index'>
      <a>View posts</a>
    </Link>

    <Link action='blog#show' params={{ slug: 'awesome-post' }}>
      <a>Read awesome post</a>
    </Link>
  </div>
```

### Universal Controllers

Republic provides the ability to define controller action handlers for your routes. These are similar to Express route handlers, however they are universal, they can run both on the server and client. This makes it really easy to handle form submissions in the client if JavaScript is available, or submit to the server if not.

#### Defining an Action Handler

You define your action handlers beside your routes, much like Express.

``` js
import Republic, { route } from 'republic/next'
import blog from './src/blog/'

export default new Republic(
  route.page('/blog', 'blog#index', () => {
    return { posts: blog.FetchLatestBlogPosts() }
  }),
  
  route.page('/blog/:slug', 'blog#show', ({ params }) => {
    return { post: blog.FetchPost(params.slug) }
  })
)
```

As you can see, you return an object with data in it. This data will be accessible within your React page by passing the object into your page component's props.

#### Accessing Action Handler Data

To illustrate, the access of the data returns from the action handler above, here is the page for `'blog#show'`. You can see we are accessing the post data returned from the action handler.

``` js
import React from 'react'
import app from '../../app'

export default app.page(({ post }) =>
  <article>
    <h1>{post.title}</h1>
    {post.content}
  </article>
```

### Universal Forms

Republic provides universal forms

## Documentation

- **[Installation](#installation)** - how to install Republic
- **[new Republic](#new-republic)** - how to define your Republic application
- **[`app.page()`](#apppage)** - how to define a Republic page
- **[`app.url()`](#appurl)** - how to build a URL
- **[`<Link>`](#link)** - how to link to other pages
- **[`<Form>`](#form)** - how to create a universal form
- **[`<Input>`](#input)** - how to add fields to your universal form

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

### app.page

### app.url

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
