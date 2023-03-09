export type OKValue<V> = {
	ok: true;
	value: V;
};
export type ErrorReason<R> = {
	ok: false;
	reason: R;
};

export type OVER<V, E> = OKValue<V> | ErrorReason<E>;
export type AsyncOVER<V, E> = Promise<OVER<V, E>>;

export type Fn<V = any> = (...args: any[]) => V;

const createOK = <V>(result: V): OKValue<V> => {
	return {
		ok: true,
		value: result,
	};
};

const createError = <R>(reason: R): ErrorReason<R> => {
	return {
		ok: false,
		reason,
	};
};

function over<TValue = any, TReason = unknown>(
	fn: Fn<TValue>,
	...params: Parameters<typeof fn>
): TValue extends Promise<infer TPValue>
	? AsyncOVER<TPValue, TReason>
	: OVER<TValue, TReason>;
function over<TFn extends Fn = Fn, TReason = unknown>(
	fn: TFn,
	...params: Parameters<typeof fn>
): ReturnType<typeof fn> extends Promise<infer TPValue>
	? AsyncOVER<TPValue, TReason>
	: OVER<ReturnType<typeof fn>, TReason>;
function over(fn: Fn<any>, ...params: Parameters<typeof fn>): any {
	try {
		let temp = fn(...params);

		if (temp instanceof Promise) {
			// @ts-ignore
			return temp
				.then((result) => createOK(result))
				.catch((reason) => createError(reason));
		}

		// @ts-ignore
		return {
			ok: true,
			value: temp,
		};
	} catch (reason) {
		return {
			ok: false,
			reason,
		};
	}
}

export { over, createOK, createError };
