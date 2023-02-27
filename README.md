# MobileCoin Block Explorer

A web app for viewing the MobileCoin blockchain.

-   Prodiction: https://block-explorer.mobilecoin.foundation
-   Staging: https://block-explorer.stage.mobilecoin.foundation
-   Testnet: TBD

# Developing

## Running the front-end

If you dont have `yarn` isntalled. Install yarn: `npm install --global yarn`

1. Install dependencies by running the following in the root of the repo

```sh
    yarn
```

2. Start the dev server with

```sh
    yarn dev
```

## Testing

-   There are integration tests that ensure that the types returned from full-service and the reserve auditor match the types expected by the app.

## Deploy

-   Any commit to main will trigger a tagged build & deploy to staging.
-   To deploy to production go to [the deploy workflow](https://github.com/mobilecoinofficial/block-explorer/actions/workflows/dispatch-deploy.yaml), click Run Workflow, and select the tag you want to deploy.

## Using different API configs

The Block Explorer can be run using the deployed mainnet backends, the deployed testnet backends, or custom backends. For testnet backend, start the dev server with `yarn dev-testnet` for custom backends, add the api env vars in `env-files/local.env` and run `yarn dev-local`.

### Getting the backends set up locally:

This is not necessary unless you need to use different versions of the full-service and reserve-auditor APIs than what we host publically.
The block explorer defaults to using hosted versions of full-service and reserve auditor APIs at https://readonly-fs-mainnet.mobilecoin.com/wallet/v2 and https://auditor.mobilecoin.foundation/api. If you want to connect to different versions of these services, you can specify them in a .env file with the vars `REACT_APP_RESERVE_AUDITOR_URL` and `REACT_APP_FULL_SERVICE_URL`.

### full-serice

-   follow the setup instructions for [full-service](https://github.com/mobilecoinofficial/full-service#usage-and-documentation)
-   Run full-service using the watcher-db and allowed-origin flags. Example:

```
--watcher-db "/tmp/mainnet.watcher" --allowed-origin "*"
```

#### Reserve Auditor

-   follow the [setup instructions](https://github.com/mobilecoinofficial/reserve-auditor/blob/main/BUILD.md) to get the reserve auditor backend running.
