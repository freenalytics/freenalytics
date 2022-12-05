# Server for Freenalytics

The server for Freenalytics. It is an Express server that serves the API and the static build of the
[Web Dashboard](https://github.com/freenalytics/freenalytics/tree/master/web-dashboard).

## Development

If you're interested in developing the server, please check out [Server Development](https://freenalytics.github.io/development/server/)
on the documentation page.

For development, make sure you're running at least [Node v16.15.1](https://nodejs.org/en/).

Clone this repository:

```text
git clone https://github.com/freenalytics/freenalytics
```

Then install the dependencies:

```text
npm install
```

> Inside the `server` folder.

Then, create a `.env` file inside the `server` folder and add the following values:

```text
MONGODB_URI=
REDIS_URI=
JWT_SECRET=
JWT_TOKEN_DURATION=604800
REGISTRATION_OPEN=true
```

> You need both a MongoDB and Redis instance running alongside. Check the [development environment](#development-environment)
> section for more info.

Finally, start up the development server with:

```text
npm run dev
```

Or, you can also start a restarting-on-save development server with:

```text
npm run dev:watch
```

### Development Environment

This package includes a development environment inside the `dev` folder.

You can start up the development environment (which includes MongoDB and Redis instances) with:

```text
docker-compose up
```

> You need [Docker](https://www.docker.com/) to be able to run this environment server.

### Available Scripts

This package contains the following scripts:

#### `npm run dev`

Starts up the development server. This does not restart on file changes.

#### `npm run dev:watch`

Starts up a watching development server. This restarts on file changes.

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

#### `npm start`

Starts up the server in production mode. This runs from the production build, meaning you should run `npm run build`
before running this.

#### `npm run docgen:spec`

Generate the spec file for the API documentation. Run this whenever you have made documentation updates and wish
to preview the changes locally.

#### `npm run docgen:serve`

Starts up a watch server that reloads whenever the documentation spec file is updated.

#### `npm run docgen:build`

Builds the documentation site to the `build-docs` folder.

#### `npm run docgen:full`

Builds the documentation spec file and site to the `build-docs` folder.
