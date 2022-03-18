import { over, OVER, ErrorReason, OKValue } from "./over";

declare function syncString(name: string): string;

declare function asyncString(name: string): Promise<string>;

declare let overVar: OVER<string, number>;

let boolVar: boolean;

let stringVar: string;

let numVar: number;

if (overVar.ok) {
	// @dts-jest:pass value should be an OKValue
	let or = overVar as OKValue<string>;
} else {
	// @dts-jest:pass reason should be an ErrorReason
	let er = overVar as ErrorReason<number>;
}

// @dts-jest:pass return type should be an OVER
overVar = over<typeof syncString, number>(syncString, "value");

// @dts-jest:fail param should be a string
over<typeof syncString, number>(syncString, 1);

async function testAsync() {
	let pRe = over<typeof asyncString, number>(asyncString, "value");

	// @dts-jest:pass ok should be a promise
	let promiseVar: Promise<any> = pRe;

	// @dts-jest:pass after await, ok should be an OVER
	overVar = await pRe;
}
