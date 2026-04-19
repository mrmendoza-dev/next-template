import { DevErrorBoomView } from "@/components/dev/dev-error-boom-view";
import { notFound } from "next/navigation";

export default function Page() {
	if (process.env.NODE_ENV !== "development") {
		notFound();
	}
	return <DevErrorBoomView />;
}
