import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";
import { formatPrice, type Destination } from "@/lib/destinations";

/** Placeholder rating until the API exposes one. */
const FALLBACK_RATING = 4.5;

type DestinationCardProps = {
  destination: Destination;
  className?: string;
};

export function DestinationCard({
  destination,
  className,
}: DestinationCardProps) {
  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-lg bg-white py-0 ring-0 shadow-none",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-semibold text-zinc-900 shadow-sm">
          {FALLBACK_RATING}
          <Star className="size-3.5 fill-zinc-900 text-zinc-900" />
        </span>
      </div>

      <CardContent className="flex flex-col gap-2 py-4">
        <p className="flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin className="size-4 text-zinc-400" aria-hidden="true" />
          {destination.country}
        </p>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg leading-snug font-medium text-zinc-900">
            {destination.name}
          </h3>
          <p className="shrink-0 text-zinc-900">
            <span className="text-lg font-semibold">
              ${formatPrice(destination.price)}
            </span>
            <span className="text-xs text-zinc-500">/Person</span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-zinc-500">
          <CalendarDays className="size-4 text-zinc-400" aria-hidden="true" />
          {destination.duration}
        </p>

        {/* TODO: point to the destination detail page once it exists. */}
        <Link
          href={`/destination/${destination._id}`}
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold tracking-wide text-[#00A5CC] uppercase transition-colors hover:text-[#008FB3]"
        >
          Book Now
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
