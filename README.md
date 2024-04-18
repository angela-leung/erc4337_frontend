# Project

ERC-4337, also known as account abstraction, unlocks a new realm of possibilities in the Ethereum ecosystem. This showcase is designed to demonstrate how users can register and log in using a username and password. More importantly, it illustrates how user accounts can be funded with native tokens.

Users can then utilize these tokens to subscribe to various services. This process not only simplifies the user experience but also opens up a wide range of potential use cases. By leveraging the power of ERC-4337, we aim to foster a more accessible and user-friendly environment within the blockchain space.

## Pre-requisites

Set up the following environment variables `.env`:

- Thirdweb's [API key](https://portal.thirdweb.com/account/api-keys) to enable the account abstraction infrastructure.
- Account Factory contract address
- Subscription contract address

## Commands

Install dependencies

```bash
npm install
# or
yarn install
```

Development server

```bash
npm run dev
# or
yarn dev
```

## Routes

- `/` - Login / registration page
- `/dashboard` - User dashboard page
- `/admin` - Admin Login / Dashboard
