import React from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Destination, formatPrice } from "@/lib/destinations";
import { toast } from "@/components/ui/toast";
const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
] as const;

type BookingCard = {
  destination: Destination;
};

const BookingCard = ({ destination }: BookingCard) => {
  const handleBookNow = () => {
    toast.add({
      type: "success",
      title: "Booking requested",
      description: `"${destination.name}" for ${formatDepartureDate(destination.departure)} has been requested.`,
    });
  };

  function formatDepartureDate(departure: string): string {
    const date = new Date(departure);
    if (Number.isNaN(date.getTime())) return departure;
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  return (
    <aside>
      <Card className="gap-0 rounded-xl bg-white py-0 shadow-none ring-1 ring-zinc-200 lg:sticky lg:top-24">
        <CardContent className="flex flex-col gap-5 p-6">
          <div>
            <p className="text-sm text-zinc-500">Starting from</p>
            <p className="mt-1 text-3xl font-semibold text-[#00A5CC]">
              ${formatPrice(destination.price)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">per person</p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="departure-date"
              className="text-sm font-medium text-zinc-900"
            >
              Departure Date
            </label>
            <Input
              id="departure-date"
              readOnly
              value={formatDepartureDate(destination.departure)}
              className="h-10 border-transparent bg-[#F6F7F8] text-zinc-700 shadow-none"
            />
          </div>

          <Button
            type="button"
            onClick={handleBookNow}
            className="h-10 w-full bg-[#00A5CC] px-5 text-white hover:bg-[#008FB3]"
          >
            Book Now
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>

          <ul className="flex flex-col gap-2 border-t border-zinc-100 pt-4">
            {PERKS.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2 text-sm text-zinc-600"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-green-600"
                  aria-hidden="true"
                />
                {perk}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
};

export default BookingCard;
