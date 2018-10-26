
# Pintegram App

## Instructions

### Running the application

```sh
$ yarn start
```

### Building the distribution package

```sh
$ yarn run build
```

### Deploying the package in surge

1. run surge

```sh
$ surge
```

2. enter credentials (if they are asked)

3. enter the folder from which to deploy (```build```)

### Running tests

1. Run specs using Mocha and Chai

```sh
$  mocha src/logic.spec.js --timeout 10000
```

