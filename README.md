# serverless-appsync-boilerplate

Example boilerplate that's using [serverless-appsync-jest-plugin](https://github.com/artoliukkonen/serverless-appsync-jest-plugin).

# Getting started

## Install service & dependencies

```
sls install -u https://github.com/artoliukkonen/serverless-appsync-boilerplate -n myAppSyncProject
cd myAppSyncProject
yarn
```

## Create new resolver

```
sls create appsync
```

## Start offline mode

```
yarn start
```

## Deploy to AWS

```
yarn deploy
```