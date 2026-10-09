import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatView } from "@/components/chat/ChatView";
import { DetailView } from "@/components/detail/DetailView";
import { ProfileView } from "@/components/profile/ProfileView";

describe("page views", () => {
	it("renders the chat view", () => {
		render(<ChatView />);
		expect(screen.getByTestId("chat-page")).toBeInTheDocument();
	});

	it("renders the detail view with its resource id", () => {
		render(<DetailView id="demo-id" />);
		expect(screen.getByTestId("detail-page")).toBeInTheDocument();
		expect(screen.getByText("demo-id")).toBeInTheDocument();
	});

	it("renders the profile view", () => {
		render(<ProfileView />);
		expect(screen.getByTestId("profile-page")).toBeInTheDocument();
	});
});
