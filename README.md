# MobileCoin Block Explorer

A web app for viewing the MobileCoin blockchain.
Hosted at https://block-explorer.mobilecoin.com

# Develop

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

## Getting the backends set up:

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

## Build & Deploy

-   Any commit to main will trigger an image build and upload to dockerhub. If you want to skip this, inlcude `skip docker` in the commit message.
-   To trigger a deploy, include the word `deploy` in the message for a commit on main.
