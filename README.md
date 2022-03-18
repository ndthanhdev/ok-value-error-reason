# ok-value-error-reason

[![npm version](https://img.shields.io/npm/v/axios.svg?style=flat-square)](https://www.npmjs.org/package/ok-value-error-reason)

An elegant way to handle exceptions from both synchronous and asynchronous functions.

## Usage

```ts
import {
	over, // stand for 'ok-value-error-reason'
} from "ok-value-error-reason";

let re = over<typeof fnReturnString, "EMPTY" | "TOO_LONG">(
	fnReturnString,
	arg1,
);

if (re.ok) {
	console.log(re.value); // number
} else {
	console.error(re.reason); // "EMPTY" | "TOO_LONG"
}

// async
let asyncRe = await over<typeof asyncFnReturnString, "EMPTY" | "TOO_LONG">(
	fnReturnString,
	arg1,
);
```
