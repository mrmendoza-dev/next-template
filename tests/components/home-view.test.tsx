import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomeView } from "@/components/home/HomeView";

const jsonResponse = (body: unknown) =>
	Promise.resolve(new Response(JSON.stringify(body), { status: 200 }));

beforeEach(() => {
	vi.stubGlobal(
		"fetch",
		vi.fn((url: string) => {
			if (url.includes("/api/v1/health")) {
				return jsonResponse({ status: "ok" });
			}
			if (url.includes("/api/v1/examples")) {
				return jsonResponse([]);
			}
			return Promise.reject(new Error(`Unhandled fetch: ${url}`));
		}),
	);
});

describe("HomeView", () => {
	it("surfaces API health via TanStack Query", async () => {
		const queryClient = new QueryClient();
		render(
			<QueryClientProvider client={queryClient}>
				<HomeView />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByTestId("api-health-status")).toHaveTextContent(
				"API: ok",
			);
		});
	});
});
