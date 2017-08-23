# Republic

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg" width="150" />

[![npm version](https://badge.fury.io/js/republic.svg)](https://badge.fury.io/js/republic)

Republic is a library for React that gives you productive routing, controllers, and forms. It currently is built to work with Express + Next.js but has been built in mind that this may not always be the stack of choice.

If you miss the days of Rails forms and controllers, you'll love Republic.

- **[Beginners Guide](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)** - for those who haven't used Republic before
- **[Concepts](#concepts)** - the reasons why you should use Republic
- **[Documentation](#documentation)** - for a reference of all the parts to Republic

## Beginners Guide

We have a lovely document for creating an application from scratch using Express + Next.js + Republic. The guide is a complete walkthrough that's ideal for first time users. [Read it to get started.](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)

## Concepts

There are three concepts that make Republic compelling to use.

- Routing
- Controllers
- Forms

Republic tries to fuse the productivity provided by web frameworks like Rails with the new world of React. Unfortunately React requires quite a lot of boilerplate when making forms, Redux isn't straight forward when dealing with data, and Next.js does not have any inbuilt routing. Republic aims to solve all of these problems.

### Routing

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

### Controllers

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

``` jsx
import React from 'react'
import app from '../../app'

export default app.page(({ post }) =>
  <article>
    <h1>{post.title}</h1>
    {post.content}
  </article>
)
```

### Forms

Republic provides universal forms that handle state management for you. No longer do you need to define your own onChange handlers, a huge bug bear for those coming from Rails. Also, because Republic provides universal forms, the form can be handled both server side if JavaScript is not available, or in the client if it is.

#### Defining an Action Handler for your Form

Before we build our form, we first want to define our action handler that will be called on submit. The process is similar to defining a page route.

``` js
import Republic, { route } from 'republic/next'
import blog from './src/blog/'

export default new Republic(
  route.page('/blog', 'blog#index', () => {
    return { posts: blog.FetchLatestBlogPosts() }
  }),

  route.POST('/blog/subscribe', 'blog#subscribe', async ({ params, redirectTo }) => {
    await blog.Subscribe(params.email)
    redirectTo('blog#index')
  })
)
```

This action will handle a new subscription to the blog's mailing list. Once the subscription has been created, we then redirect the user back to the blog index page.

#### Building your Form

Now we have defined our action handler, we can use it in a form. Within our `'blog#index'` page we can define our form and pass our action into it.

``` jsx
import React from 'react'
import { Form, Input } from 'republic/react'
import app from '../../app'
import PostList from '../../components/PostList'

export default app.page(({ posts, subscribe }) =>
  <Form action={subscribe}>
    <Input type='email' name='subscription[email]' />
    <Input type='checkbox' name='subscription[include_spam]' value='yes' />
    <button>Subscribe</button>
  </Form>
)
```

Because `'blog#index'` is in the same controller as `'blog#subscribe'` the subscribe action handler is automatically passed into the props of the page. You can see this handler is then passed into the `<Form>`'s `action` prop. The handler will be called onSubmit with the form data, or handled on the server if JavaScript is not available.

## Documentation

- **[Installation](#installation)** - how to install Republic
- **[`new Republic(...routes)`](#new-republicroutes)** - how to define your Republic application
- **[`app.page(Component)`](#apppagecomponent)** - how to define a Republic page
- **[`app.url(action, params = {})`](#appurlaction-params--)** - how to build a URL
- **[`<Link>`](#link)** - how to link to other pages
- **[`<Form>`](#form)** - how to create a universal form
- **[`<Input />`](#input-)** - how to add fields to your universal form
- **[`<Textarea />`](#textarea-)** - how to add textarea fields to your universal form
- **[`<Select>`](#select)** - how to add select fields to your universal form

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

### `new Republic(...routes)`

### `app.page(Component)`

### `app.url(action, params = {})`

### `<Link>`

### `<Form>`

### `<Input />`

#### `<Input type='radio' />`

#### `<Input type='checkbox' />`

### `<Textarea />`

### `<Select>`

## Roadmap

- [x] Form state handling
- [x] Connect form state to action handling
- [x] Form handling receives nested object rather than flattened string keys
- [x] Allow forms to have default state set
- [x] Pass actions in as functions rather than strings so they can be used with custom forms, and on other input events like click

**Nice to haves:**

- [x] Update route builders to accept middleware as arguments, array as single argument, or mix of both like Express
- [x] Pass rails-like params into handlers
- [x] Universal redirect
- [x] Provide all common form inputs
- [ ] Convention for express + next (helper wrappers)
- [ ] Form error handling
- [ ] Abstract pages away from Next.js
- [ ] Allow Form to have custom onSubmit
- [ ] Upcoming middleware: how to, make sure API is easy to understand, etc.
