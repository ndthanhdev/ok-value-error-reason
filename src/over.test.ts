import { over } from "./over";

function okSync(name: string) {
	return name;
}

function errorSync(name: string) {
	throw new Error(name);
}

function okAsync(name: string) {
	return Promise.resolve(name);
}

function errorAsync(name: string) {
	return Promise.reject(new Error(name));
}

it("sync ok", () => {
	expect(over(okSync, "value")).toEqual({
		ok: true,
		value: "value",
	});
});

it("sync error", () => {
	expect(over(errorSync, "reason")).toEqual({
		ok: false,
		reason: new Error("reason"),
	});
});

it("async ok", async () => {
	await expect(over(okAsync, "value")).resolves.toEqual({
		ok: true,
		value: "value",
	});
});

it("async error", async () => {
	await expect(over(errorAsync, "reason")).resolves.toEqual({
		ok: false,
		reason: new Error("reason"),
	});
});
