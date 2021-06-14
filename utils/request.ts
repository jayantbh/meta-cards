export const request = async <T = any>(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<T> =>
  await fetch(input, init)
    .then((r) => {
      if (r.status < 400) return r;
      throw new Error("REQUEST_ERROR: " + r.status);
    })
    .then((r) => {
      if (r.headers.get("Content-Type")?.includes("application/json"))
        return r.json();
      return r.text();
    });
