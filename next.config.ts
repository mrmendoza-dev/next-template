import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/**
	 * Baseline security headers for a typical app. Tune per deployment:
	 * - **HSTS**: Usually set at the CDN / reverse proxy (e.g. Vercel) with HTTPS only.
	 * - **CSP**: Strong CSP often needs nonces/hashes for Next.js inline scripts; add when you have a concrete policy.
	 */
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					// Clickjacking: do not allow this site in frames (use CSP frame-ancestors for finer control).
					{ key: "X-Frame-Options", value: "DENY" },
					// Reduce MIME sniffing surprises for static assets.
					{ key: "X-Content-Type-Options", value: "nosniff" },
					// Limit referrer leakage on cross-origin navigations.
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					// Default-deny sensitive browser features; widen when you need them.
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
};

export default nextConfig;
