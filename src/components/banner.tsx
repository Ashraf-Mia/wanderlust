import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
] as const;

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button className="h-12 gap-2 rounded-md bg-gradient-to-r from-[#2FB0D4] to-[#008FB3] px-8 text-sm font-semibold uppercase tracking-wider text-white hover:from-[#28A3C6] hover:to-[#007F9F]">
            Explore Now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link href="/destination">
            <Button
              variant="outline"
              className="h-12 rounded-md border-white/30 bg-white/20 px-8 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/30 hover:text-white"
            >
              View Destination
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white/20 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="border-t border-white/25 px-6 py-4 first:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <label
                htmlFor={`hero-search-${field.label.toLowerCase().replaceAll("/", "-")}`}
                className="text-sm font-semibold text-white"
              >
                {field.label}
              </label>
              <Input
                id={`hero-search-${field.label.toLowerCase().replaceAll("/", "-")}`}
                placeholder={field.placeholder}
                className="mt-1.5 h-auto border-0 bg-transparent px-0 text-white shadow-none placeholder:text-white/75 focus-visible:border-0 focus-visible:ring-0 md:text-sm"
              />
            </div>
          ))}
          <Button className="h-auto rounded-none bg-[#00A5CC] px-10 py-6 text-base font-semibold text-white hover:bg-[#008FB3] sm:col-span-2 lg:col-span-1 lg:px-12">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
