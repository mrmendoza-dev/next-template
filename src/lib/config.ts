/**
 * Central place for env-derived and app constants (safe to import from client or server
 * unless a symbol is documented otherwise).
 */

/** Current REST API version path prefix (no trailing slash). */
export const API_V1_PREFIX = "/api/v1" as const;

/**
 * Optional absolute origin for API calls from the browser (e.g. static host → separate API).
 * Empty string means same-origin paths only.
 */
export const getPublicApiOrigin = (): string =>
	typeof process.env.NEXT_PUBLIC_API_URL === "string"
		? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
		: "";

export const hasExplicitApiOrigin = (): boolean =>
	Boolean(getPublicApiOrigin().length > 0);

/**
 * Full URL for a path beginning with `/`, e.g. `/api/v1/health`.
 * When `NEXT_PUBLIC_API_URL` is set, prefixes that origin.
 */
export const resolvePublicUrl = (path: string): string => {
	const origin = getPublicApiOrigin();
	const p = path.startsWith("/") ? path : `/${path}`;
	return origin ? `${origin}${p}` : p;
};
