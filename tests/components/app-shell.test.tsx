import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "@/contexts/Providers";

describe("AppShell", () => {
	it("renders navigation, main, and sidebar toggle", () => {
		render(
			<Providers>
				<AppShell>
					<div>content</div>
				</AppShell>
			</Providers>,
		);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
		expect(screen.getByRole("main")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /toggle sidebar/i }),
		).toBeInTheDocument();
	});
});
