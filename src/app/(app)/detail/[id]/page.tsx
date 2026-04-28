import { DetailView } from "@/components/detail/DetailView";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	return <DetailView id={id} />;
}
