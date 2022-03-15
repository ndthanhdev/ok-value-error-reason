export type OKValue<V> = {
  ok: true;
  error: false;
  value: V;
};
export type ErrorReason<R> = {
  ok: false;
  error: true;
  reason: R;
};

export type OVER<V, E> = OKValue<V> | ErrorReason<E>;
export type AsyncOVER<V, E> = Promise<OVER<V, E>>;

type Fn<V = any> = (...args: any[]) => V;

function over<TValue = any, TReason = unknown>(
  fn: Fn<TValue>,
  ...params: Parameters<typeof fn>
): TValue extends Promise<infer TPValue>
  ? AsyncOVER<TPValue, TReason>
  : OVER<TValue, TReason>;
function over<TFn extends Fn = Fn, TReason = unknown>(
  fn: TFn,
  ...params: Parameters<TFn>
): ReturnType<TFn> extends Promise<infer TPValue>
  ? AsyncOVER<TPValue, TReason>
  : OVER<ReturnType<TFn>, TReason>;
function over(fn: Fn<any>, ...params: Parameters<typeof fn>): any {
  try {
    let temp = fn(...params);

    if (temp instanceof Promise) {
      // @ts-ignore
      return temp
        .then((result) => {
          return {
            ok: true,
            error: false,
            result: result,
          };
        })
        .catch((reason) => {
          return {
            ok: false,
            error: true,
            reason,
          };
        });
    }

    // @ts-ignore
    return {
      ok: true,
      error: false,
      value: temp,
    };
  } catch (reason) {
    // @ts-ignore
    return {
      ok: false,
      error: true,
      // @ts-ignore
      reason,
    };
  }
}

export { over };
