import { DevErrorBoom } from "@/components/dev/dev-error-boom";
import { notFound } from "next/navigation";

export default function DevErrorBoomPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <DevErrorBoom />;
}
