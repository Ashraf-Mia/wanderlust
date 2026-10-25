"use client";

import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destination-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ALL_CATEGORIES,
  PRICE_RANGES,
  SORT_OPTIONS,
  type Destination,
} from "@/lib/destinations";

type DestinationExplorerProps = {
  destinations: Destination[];
};

export function DestinationExplorer({ destinations }: DestinationExplorerProps) {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("default");

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category))).sort(),
    [destinations]
  );

  const visibleDestinations = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.value === priceRange) ?? PRICE_RANGES[0];

    const filtered = destinations.filter((destination) => {
      const matchesCategory =
        category === ALL_CATEGORIES || destination.category === category;
      const price = Number(destination.price);
      const matchesPrice =
        Number.isFinite(price) && price >= range.min && price <= range.max;
      return matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
      case "price-desc":
        return [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [destinations, category, priceRange, sort]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <h1 className="text-3xl font-light text-zinc-900 md:text-4xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-zinc-500 md:text-lg">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 rounded-lg border border-zinc-200 bg-white p-3 sm:grid-cols-3">
        <Select value={category} onValueChange={(value) => value && setCategory(value)}>
          <SelectTrigger
            aria-label="Filter by category"
            className="h-10 w-full border-zinc-200 bg-[#F6F7F8] pr-2 pl-2.5 shadow-none uppercase"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORIES}>All Categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={(value) => value && setPriceRange(value)}>
          <SelectTrigger
            aria-label="Filter by price range"
            className="h-10 w-full border-zinc-200 bg-[#F6F7F8] pr-2 pl-2.5 shadow-none uppercase"
          >
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => value && setSort(value)}>
          <SelectTrigger
            aria-label="Sort destinations"
            className="h-10 w-full border-zinc-200 bg-[#F6F7F8] pr-2 pl-2.5 shadow-none uppercase"
          >
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Showing {visibleDestinations.length} destination
        {visibleDestinations.length === 1 ? "" : "s"}
      </p>

      {visibleDestinations.length === 0 ? (
        <p className="py-16 text-center text-zinc-500">
          No destinations match your filters.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}
