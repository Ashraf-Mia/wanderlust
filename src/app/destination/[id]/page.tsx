import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destination-detail";
import type { Destination } from "@/lib/destinations";

import { getTokenFromServer } from "@/lib/getTokenFromServer";

async function getDestination(id: string): Promise<Destination | null> {
  const token = await getTokenFromServer();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === "object" && "_id" in data ? data : null;
  } catch {
    return null;
  }
}

const DestinationDetailsPage = async ({
  params,
}: PageProps<"/destination/[id]">) => {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    notFound();
  }

  return <DestinationDetail destination={destination} />;
};

export default DestinationDetailsPage;
