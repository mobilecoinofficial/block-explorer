# MobileCoin Block Explorer

A web app for viewing the MobileCoin blockchain.

-   Prodiction mainnet: https://block-explorer.mobilecoin.foundation
-   Prodiction testnet:

-   Staging mainnet: https://block-explorer.stage.mobilecoin.foundation
-   Staging testnet:

# Developing

## Running the front-end

If you dont have `yarn` isntalled. Install yarn: `npm install --global yarn`

1. Install dependencies by running the following in the root of the repo

```sh
    yarn
```

2. Add the environment config
   The following env vars need to be set. You can set them by adding a `.env` file to the root of the project or exporting them to the shell.

-   `MC_NETWORK` should be either `test` or `main`
-   `FULL_SERVICE_URL`
-   `RESERVE_AUDITOR_SERVICE_URL`

A mainnet config would look like:

```sh
MC_NETWORK=main
RESERVE_AUDITOR_URL=https://auditor.mobilecoin.foundation/api
FULL_SERVICE_URL=https://readonly-fs-mainnet.mobilecoin.com/wallet/v2
```

A testnet config would look like

```sh
MC_NETWORK=test
RESERVE_AUDITOR_URL=https://auditor.test.mobilecoin.com/api
FULL_SERVICE_URL=https://readonly-fs-testnet.mobilecoin.com/wallet/v2
```

3. Start the dev server with

```sh
    yarn dev
```

## Testing

-   There are integration tests that ensure that the types returned from full-service and the reserve auditor match the types expected by the app.

## Deploy

-   Any commit to main will trigger a tagged build & deploy to staging for both mainnet and testnet.
-   To deploy to production go to [the deploy workflow](https://github.com/mobilecoinofficial/block-explorer/actions/workflows/dispatch-deploy.yaml), click Run Workflow, and select the tag you want to deploy. You need to do this separately for both mainnet and testnet

## Getting the backends set up locally:

This is not necessary unless you need to use different versions of the full-service and reserve-auditor APIs than what we host publically. If you want to connect to different versions of these services, you can specify them with the env vars `RESERVE_AUDITOR_URL` and `FULL_SERVICE_URL`.

### full-serice

-   follow the setup instructions for [full-service](https://github.com/mobilecoinofficial/full-service#usage-and-documentation)
-   Run full-service using the watcher-db and allowed-origin flags. Example:

```
--watcher-db "/tmp/mainnet.watcher" --allowed-origin "*"
```

#### Reserve Auditor

-   follow the [setup instructions](https://github.com/mobilecoinofficial/reserve-auditor/blob/main/BUILD.md) to get the reserve auditor backend running.
