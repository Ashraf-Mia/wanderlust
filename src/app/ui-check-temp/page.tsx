import { MyBookingCard } from "@/components/booking/MyBookingCard";
import { Toaster } from "@/components/ui/toast";

const fixture = [
  {
    _id: "b1",
    name: "Bali Paradise",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    price: "1299",
    departure: "2026-05-15",
    departureDate: "2026-05-15",
    status: "confirmed",
  },
  {
    _id: "686f1a2b3c4d5e6f70819a2b",
    name: "Venice & Italian Riviera",
    imageUrl: "",
    price: "1299",
    departure: "2026-05-15",
    status: "pending",
  },
];

export default function UiCheckPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-light text-zinc-900 md:text-4xl">
        My Bookings
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Manage and view your upcoming travel plans
      </p>
      <div className="mt-8 divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        {fixture.map((booking) => (
          <MyBookingCard key={booking._id} booking={booking} />
        ))}
      </div>
      <Toaster />
    </div>
  );
}
