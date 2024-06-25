# 00 Node.js SDK

Community made SDK for interacting with the [00 (short for DoubleZero)](https://www.double-zero.cloud/) API.

This package is inspired by the official Resend Node.js SDK.

**This package is not officially maintained by 00.**

## Install

```bash
npm install 00-js
# or
pnpm add 00-js
# or
yarn add 00-js
```

## Setup

First, you need to deploy your 00 API. You can do this by following the instructions [here](https://github.com/technomancy-dev/00).

Then, create an API token in your dashboard.

```js
import { DoubleZero } from '00-js';

const doubleZero = new DoubleZero({
  baseUrl: 'https://double-zero.example.com',
  token: 'your_api_token',
});
```

## Usage

Sending emails is very simple.

```js
await doubleZero.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  subject: 'Test email from Node.js!',
  html: '<h1>Hello world from 00!</h1>',
});
```

## License

MIT License
