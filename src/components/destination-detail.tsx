"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "@/components/ui/toast";

import { formatPrice, type Destination } from "@/lib/destinations";
import EditeDetailsDialog from "./EditeDetailsDialog";
import DeleteDestinationDialog from "./DeleteDestinationDialog";

/** Placeholder content until the API exposes rating, reviews, and highlights. */
const FALLBACK_RATING = 4.9;
const FALLBACK_REVIEW_COUNT = 234;

const HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
] as const;

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
] as const;

function formatDepartureDate(departure: string): string {
  const date = new Date(departure);
  if (Number.isNaN(date.getTime())) return departure;
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

type DestinationDetailProps = {
  destination: Destination;
};

export function DestinationDetail({ destination }: DestinationDetailProps) {
  const handleBookNow = () => {
    toast.add({
      type: "success",
      title: "Booking requested",
      description: `"${destination.name}" for ${formatDepartureDate(destination.departure)} has been requested.`,
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destination"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className=" text-blue-600">Back</span> to Destinations
        </Link>

        <div className="flex items-center gap-2">
          {/* TODO: point to the edit page once it exists. */}
          <EditeDetailsDialog destination={destination} />

          <DeleteDestinationDialog destination={destination} />
        </div>
      </div>

      <div className="relative mt-6 aspect-21/9 w-full overflow-hidden rounded-xl">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
          preload
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin className="size-4 text-zinc-400" aria-hidden="true" />
            {destination.country}
          </p>

          <h1 className="mt-2 text-4xl font-light text-zinc-900 md:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-1.5">
              <Star
                className="size-4 fill-green-600 text-green-600"
                aria-hidden="true"
              />
              <span className="font-medium text-zinc-900">
                {FALLBACK_RATING}
              </span>
              <span className="text-zinc-500">
                ({FALLBACK_REVIEW_COUNT} reviews)
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-zinc-500">
              <CalendarDays
                className="size-4 text-zinc-400"
                aria-hidden="true"
              />
              {destination.duration}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-light text-zinc-900">Overview</h2>
            <p className="mt-2 leading-relaxed text-zinc-500">
              {destination.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-light text-zinc-900">Highlights</h2>
            <p className="mt-2 leading-relaxed text-zinc-500">
              {destination.description}
            </p>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {HIGHLIGHTS.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-zinc-600"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-green-600"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

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
      </div>

      <Toaster />
    </div>
  );
}
