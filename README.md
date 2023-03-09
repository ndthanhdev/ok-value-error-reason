# ok-value-error-reason

[![npm version](https://img.shields.io/npm/v/ok-value-error-reason.svg)](https://www.npmjs.org/package/ok-value-error-reason) [![CI](https://github.com/ndthanhdev/ok-value-error-reason/actions/workflows/build-n-test.yaml/badge.svg)](https://github.com/ndthanhdev/ok-value-error-reason/actions/workflows/build-n-test.yaml)

An elegant way to handle exceptions from both synchronous and asynchronous functions.

## Usage

By wrapping a function call with `over`, you get an union types `Over` (ok-value-error-reason) that represents the result of a function call.

```ts
import {
	over, // stand for 'ok-value-error-reason'
} from "ok-value-error-reason";

let ans = fnLetCrash(arg1); // => crash

let ans = over(fnLetCrash, arg1); // => ans is an `Over` object
```

**`Over` object is either a `OKValue` or `ErrorReason` object.**

```ts
export type OKValue<V> = {
	ok: true;
	value: V;
};
export type ErrorReason<R> = {
	ok: false;
	reason: R;
};

export type OVER<V, E> = OKValue<V> | ErrorReason<E>;
```

**You can use `.ok` property to narrow types.**

```ts
// Wrap fnReturnNumber execution so that it will return an Over object.
let ans = over<typeof fnReturnNumber, "EMPTY" | "TOO_LONG">(
	fnReturnNumber,
	arg1,
);

if (ans.ok) {
	// `ans` is an OKValue object
	console.log(ans.value); // `.value` is number
} else {
	// `ans` is an ErrorReason object
	console.error(ans.reason); // `.reason` is "EMPTY" | "TOO_LONG"
}
```

**`over` is also compatible with async functions.**

```ts
// async
let asyncAns = await over<typeof asyncFnReturnNumber, "EMPTY" | "TOO_LONG">(
	asyncFnReturnNumber,
	arg1,
);
```
