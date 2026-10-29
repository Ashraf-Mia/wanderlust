"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, Star } from "lucide-react";

import { Toaster } from "@/components/ui/toast";

import { type Destination } from "@/lib/destinations";
import EditeDetailsDialog from "./EditeDetailsDialog";
import DeleteDestinationDialog from "./DeleteDestinationDialog";
import BookingCard from "./booking/BookingCard";

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

type DestinationDetailProps = {
  destination: Destination;
};

export function DestinationDetail({ destination }: DestinationDetailProps) {
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

        <BookingCard destination={destination} />
      </div>

      <Toaster />
    </div>
  );
}
