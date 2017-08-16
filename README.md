# Republic

![Plato](https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg)
[![npm version](https://badge.fury.io/js/republic.svg)](https://badge.fury.io/js/republic)

Republic is a library for React that gives you isomorphic routing, forms, and actions. It currently is built to work with Express + Next.js but has been built in mind that these may not always be the stack of choice.

If you miss the days of Rails forms and controllers, you'll love Republic.

## Getting started

We have a lovely document for creating an application from scratch using Express + Next.js + Republic. [Read it to get started.](https://github.com/lukemorton/republic/blob/master/GETTING_STARTED.md)

## Quick start

To be completed...

```
npm install --save republic
```

## Usage

To be completed...

### new Republic

### wrapPage

### <Link>

### <Form>

### <Input>
















## Roadmap

- [x] Form state handling
- [x] Connect form state to action handling
- [x] Form handling receives nested object rather than flattened string keys
- [x] Allow forms to have default state set
- [x] Pass actions in as functions rather than strings so they can be used with custom forms, and on other input events like click

**Nice to haves:**

- [ ] Provide all common form inputs
- [ ] Allow Form to have custom onSubmit
- [ ] Update route builders to accept middleware as arguments, array as single argument, or mix of both like Express
- [ ] Upcoming middleware: how to, make sure API is easy to understand, etc.
