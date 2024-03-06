### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callback functions passed as arguements. Use of promises for asynchronous operations.Async and await is very popular for asynchronous coding in JS.

- What is a Promise?
In JS a promise is an object representing the eventual completion or failure of an async operation.

- What are the differences between an async function and a regular function?
So async will use await and returns promises. Regular function does not support async or await directly.

- What is the difference between Node.js and Express.js?
Node.js is the runtime environment that allows you to run JavaScript on the server, while Express.js is a framework that runs on top of Node.js, providing a set of tools and features to simplify the process of building web applications and APIs.

- What is the error-first callback pattern?
The error-first callback pattern is a convention in Node.js where callbacks used in asynchronous functions have an agreement that the first parameter will be reserved for an error object.

- What is middleware?
Middleware in the context of web development, especially with frameworks like Express.js, refers to functions that have access to the request and response objects during the HTTP request-response cycle. These functions can perform various tasks, modify the request or response, or end the request-response cycle. Middleware sits in between the incoming request and the final route handler.

- What does the `next` function do?
The next function in Express.js is used to pass control to the next middleware function in the stack.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
First problem is its not operating asynchronously so you will have to wait for each API call to complete before going to next call which will cause loading issues. There is also no error handling to identify any bugs that may be tricky.
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```