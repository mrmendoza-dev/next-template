import { notFound } from "next/navigation";
import { DevErrorBoomView } from "@/components/dev/dev-error-boom-view";

export default function Page() {
	if (process.env.NODE_ENV !== "development") {
		notFound();
	}
	return <DevErrorBoomView />;
}
