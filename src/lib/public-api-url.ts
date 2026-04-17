/**
 * Optional absolute origin for API calls (e.g. static preview pointing at another host).
 * Empty string means same-origin `/api/*`.
 */
export const publicApiUrl = (): string =>
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "";

export const hasExplicitApiOrigin = (): boolean =>
  Boolean(publicApiUrl().length > 0);
