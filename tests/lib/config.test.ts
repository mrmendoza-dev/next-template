import { describe, expect, it } from "vitest";
import {
	API_V1_PREFIX,
	hasExplicitApiOrigin,
	resolvePublicUrl,
} from "@/lib/config";

describe("config", () => {
	it("exposes API v1 prefix", () => {
		expect(API_V1_PREFIX).toBe("/api/v1");
	});

	it("resolvePublicUrl keeps same-origin paths when no public API origin", () => {
		expect(resolvePublicUrl("/api/v1/health")).toBe("/api/v1/health");
		expect(hasExplicitApiOrigin()).toBe(false);
	});
});
