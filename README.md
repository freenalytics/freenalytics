![banner](https://i.imgur.com/tBBSauS.jpg)

[![ci-build-status](https://img.shields.io/github/workflow/status/freenalytics/freenalytics/On%20Push%20%28Master%29?logo=github&label=CI)](https://github.com/freenalytics/freenalytics)
[![open-issues-count](https://img.shields.io/github/issues-raw/freenalytics/freenalytics?label=Open%20Issues&logo=github)](https://github.com/freenalytics/freenalytics)
[![open-pr-count](https://img.shields.io/github/issues-pr-raw/freenalytics/freenalytics?label=Open%20PRs&logo=github)](https://github.com/freenalytics/freenalytics)
[![docker-image-size](https://ghcr-badge.herokuapp.com/freenalytics/freenalytics/size)](https://github.com/freenalytics/freenalytics/pkgs/container/freenalytics)
[![version](https://img.shields.io/github/package-json/v/freenalytics/freenalytics?logo=Node.js&logoColor=white)](https://github.com/freenalytics/freenalytics)
[![documentation](https://img.shields.io/website?down_color=red&down_message=Offline&label=Documentation&logo=Read%20the%20Docs&logoColor=white&up_color=green&up_message=Online&url=https%3A%2F%2Ffreenalytics.github.io)](https://freenalytics.github.io)
[![license](https://img.shields.io/github/license/freenalytics/freenalytics)](https://github.com/freenalytics/freenalytics)

# Freenalytics

An open source, self-hosted dashboard for usage analytics of general use applications.

For more detailed information, please visit the [documentation site](https://freenalytics.github.io/).

## Manual Installation

First, make sure you're running at least [Node v16.15.1](https://nodejs.org/en/).

Clone this repository:

```text
git clone https://github.com/freenalytics/freenalytics
```

### Inside the `web-dashboard` Folder

Install the dependencies:

```text
npm ci
```

And build the application:

```text
npm run build
```

This will create a folder named `build`. You need to move this folder into the `server` folder
and rename it to `client-build`.

### Inside the `server` Folder

Install the dependencies:

```text
npm ci
```

And build the server:

```text
npm run build
```

Create a file named `.env` and add the following configuration:

```text
MONGODB_URI=
REDIS_URI=
JWT_SECRET=
JWT_TOKEN_DURATION=604800
REGISTRATION_OPEN=true
PORT=3000
```

> You additionally need MongoDB and Redis instances. Once you have them set up, add their URIs inside this file.

Make sure you have moved the `web-dashboard/build` folder into `server/client-build`.

You can now start the server with:

```text
npm start
```

The server will be listening to the port you've specified above.

## Docker Image (Recommended)

The recommended way to host this application is through [Docker](https://www.docker.com/).

You can base yourself off of this `docker-compose.yml` file:

```yaml
version: '3.9'

services:
  freenalytics:
    image: ghcr.io/freenalytics/freenalytics:latest
    restart: unless-stopped
    depends_on:
      - mongo
      - redis
    ports:
      - '3000:3000'
    environment:
      MONGODB_URI: mongodb://root:password@mongo:27017/freenalytics?authSource=admin
      REDIS_URI: redis://redis:6379
      JWT_SECRET: MY_SUPER_SECRET
      REGISTRATION_OPEN: true

  mongo:
    image: mongo:latest
    restart: unless-stopped
    volumes:
      - ./data-mongo:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password

  redis:
    image: redis:latest
    restart: unless-stopped
    volumes:
      - ./data-redis:/data
    command: redis-server --loglevel warning
```

You can then start the service with:

```text
docker-compose up -d
```

### Configuration

You can configure the service with the following environment variables:

| Environment Variable | Required | Description                                                                                                                                |
|----------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| MONGODB_URI          | **Yes**  | The URI of the MongoDB instance to use as database.                                                                                        |
| REDIS_URI            | **Yes**  | The URI of the Redis instance to use as cache.                                                                                             |
| JWT_SECRET           | **Yes**  | A string to use as secret to sign JWT tokens. You can use `openssl rand -hex 32` to generate one for you.                                  |
| JWT_TOKEN_DURATION   | No       | The time (in seconds) that the user JWT tokens will last for. Defaults to `604800` which is 7 days.                                        |
| REGISTRATION_OPEN    | No       | Whether users can register to create an account. By default this is set to `false`. You can enable registration by setting this to `true`. |

## Development

Please check the [server](https://github.com/freenalytics/freenalytics/blob/master/server/README.md) and
[web-dashboard](https://github.com/freenalytics/freenalytics/blob/master/web-dashboard/README.md) READMEs for
more information on how to develop for this application.

## Author

This application was made by [Freenalytics](https://github.com/freenalytics) as a final college project.
