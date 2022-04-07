export function assertString(arg: string | number): string {
  if (typeof arg === "string" && isNaN(+arg)) {
    return arg;
  } else {
    throw new Error("expected arg was not of type string.");
  }
}

export function assertNumber(arg: string | number): number {
  if (!isNaN(+arg)) {
    return +arg;
  } else {
    throw new Error("expected arg was not of type number.");
  }
}

export function assertNumberOptional(
  arg?: string | number
): number | undefined {
  if (arg === undefined) return arg;
  return assertNumber(arg);
}

export function assertStringOptional(
  arg?: string | number
): string | undefined {
  if (arg === undefined) return arg;
  return assertString(arg);
}
