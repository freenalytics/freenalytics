# Web Dashboard for Freenalytics

Web Dashboard to interface with the API service. Made in React as an SPA, should be served by the same
server that serves the API.

## Development

For development, make sure you're running at least [Node v16.15.1](https://nodejs.org/en/).

Clone this repository:

```text
git clone https://github.com/freenalytics/freenalytics
```

Then install the dependencies for both components:

```text
npm install
```

> In both the `server` and `web-dashboard` folders.

Before continuing, make sure to check the [Development Section of the `server`'s README](https://github.com/freenalytics/freenalytics/tree/master/server#development)
to see how to get the API server running.

Finally, start up the development server with:

```text
npm run dev
```

### Available Scripts

This package contains the following scripts:

#### `npm run dev`

Starts up the React development server. Use this to see your changes while developing.

#### `npm run lint`

Run the linter to spot any linting issues.

#### `npm run lint:fix`

Automatically fix any fixable linting issues.

#### `npm run test`

Run all test files once.

#### `npm run test:watch`

Starts a watching server for the test runner, automatically re-runs relevant tests when a file is saved.

#### `npm run build`

Create the application's production build.

#### `npm run eject`

This is CRA's eject script, gives you control of the Webpack config used.

**Do not run this command unless you really need to, there is no reason (yet) to eject this app.**

