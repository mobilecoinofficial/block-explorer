# MobileCoin Block Explorer

# Running locally

## Getting the backends set up:

Make sure that both full-service and the reserve auditor are using the same network (testnet or mainnet)

## full-serice

-   follow the setup instructions for [full-service](https://github.com/mobilecoinofficial/full-service#usage-and-documentation)
-   Run full-service using the watcher-db and allowed-origin flags. Example:

```
--watcher-db "/tmp/mainnet.watcher" --allowed-origin "*"
```

## Reserve Auditor

-   follow the [setup instructions](https://github.com/mobilecoinofficial/reserve-auditor/blob/main/BUILD.md) to get the reserve auditor backend running.

## Running the front-end

1. add a .env file in the project root directory with the backend URLS. example:

```
REACT_APP_RESERVE_AUDITOR_URL=http://localhost:8080
REACT_APP_FULL_SERVICE_URL=http://localhost:9090/wallet/v2
```

If you dont have `yarn` isntalled. Install yarn: `npm install --global yarn`

2. run

```sh
    yarn
```

in the root of the repo to install dependencies.

3. run

```sh
    yarn dev
```

To start the dev server
