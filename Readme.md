# Dare2 Share Readme

Basic setup Credits: http://maksimivanov.com/posts/ethereum-react-dapp-tutorial

## How to run Dare2Share

First install truffle and ganache globally:

```sh
npm install -g truffle
npm install -g ganache-cli
```

Now run `ganache-cli` on port `7545`:

```sh
ganache-cli -b 3 -p 7545
```

Run the migrations (contracts are already compiled):

```sh
truffle migrate
```

Install [🦊 Metamask](https://metamask.io/) browser extension and connect to local network (custom RPC, `http://localhost:7545`)

Go to `/front` folder install dependencies and run the app:

```sh
cd front
yarn
yarn start
```

Web app should be available on `http://localhost:3000`.

Login to Metamask using mnemonic from `ganache-cli` output. 

