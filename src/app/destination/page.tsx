import { DestinationExplorer } from "@/components/destination-explorer";
import type { Destination } from "@/lib/destinations";

const DESTINATIONS_API = "http://localhost:8000/destination";

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(DESTINATIONS_API, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

const AllDestinationPage = async () => {
  const destinations = await getDestinations();

  return <DestinationExplorer destinations={destinations} />;
};

export default AllDestinationPage;
