import { OperatorFunction, filter } from 'rxjs';

export function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter((item?: T): item is T => item !== undefined);
}

export function filterNil<T>(): OperatorFunction<T | undefined | null, T> {
  return filter(
    (item?: T | null): item is T => item !== undefined && item !== null
  );
}
